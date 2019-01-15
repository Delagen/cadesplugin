import { BrowserDetector } from "./browser-detector";
import {
	ICADESPluginAsync,
	ICADESPluginAsyncObject,
	ICADESPluginSync,
	ICADESPluginSyncObject,
	IObjectNamesMapSync,
	IObjectNamesMapAsync
} from "./interfaces";
import {
	CadesExtension,
	CadesNPAPI
} from "./plugin";

export interface ICadesBrowserPluginOptions {
	timeout: number;
}

const defaultOptions: ICadesBrowserPluginOptions = {
	timeout: 20000
};

//http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.appx
export class CadesBrowserPlugin implements ICADESPluginSync<CadesBrowserPlugin>, ICADESPluginAsync<CadesBrowserPlugin> {
	private constructor(private _pluginObject: ICADESPluginAsyncObject | ICADESPluginSyncObject) {
	}

	static Init(options: Partial<ICadesBrowserPluginOptions> = {}): Promise<CadesBrowserPlugin> {
		const pluginOptions: ICadesBrowserPluginOptions = {...defaultOptions, ...(options || {})};
		return new Promise<CadesBrowserPlugin>(async (resolve, reject) => {
			let rejected: boolean = false;
			const rejectFn: (rejectValue: any) => void = (rejectValue: any) => {
				if (rejected) {
					return;
				}
				rejected = true;
				reject(rejectValue);
			};
			try {
				setTimeout(() => rejectFn(new Error("Таймаут загрузки плагина")), pluginOptions.timeout);
				if (!BrowserDetector.isIE) {
					return resolve(new CadesBrowserPlugin(await new CadesExtension().init()));
				}
				return resolve(new CadesBrowserPlugin(await new CadesNPAPI().init()));
			}
			catch (e) {
				rejectFn(e);
			}
		});
	}

	get isAsync(): boolean {
		return this._pluginIsAsync();
	}

	private _pluginIsAsync(pluginObject: ICADESPluginAsyncObject | ICADESPluginSyncObject = this._pluginObject): pluginObject is ICADESPluginAsyncObject {
		return "CreateObjectAsync" in this._pluginObject;
	}

	CreateObject<T extends keyof IObjectNamesMapSync>(objName: T): IObjectNamesMapSync[T] { //tslint:disable-line function-name
		if (!this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.CreateObject(objName);
		}
		throw new Error("Синхронный интерфейс не поддерживается");
	}

	async CreateObjectAsync<T extends keyof IObjectNamesMapAsync>(objName: T): Promise<IObjectNamesMapAsync[T]> { //tslint:disable-line function-name
		if (this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.CreateObjectAsync(objName);
		}
		throw new Error("Асинхронный интерфейс не поддерживается");
	}

	async ReleasePluginObjects(): Promise<boolean> { //tslint:disable-line function-name
		if (this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.ReleasePluginObjects();
		}
		throw new Error("Асинхронный интерфейс не поддерживается");
	}
}
