import { BrowserDetector } from "./browser-detector";
import {
	CADESPluginAsync,
	CADESPluginAsyncObject,
	CADESPluginSync,
	CADESPluginSyncObject,
	ObjectNames,
	ObjectNamesAsync
} from "./interfaces";
import {
	CadesExtension,
	CadesNPAPI
} from "./plugin";

export interface CadesBrowserPluginOptions {
	timeout: number
}

const defaultOptions: CadesBrowserPluginOptions = {
	timeout: 20000
};

//http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.appx
export class CadesBrowserPlugin implements CADESPluginSync<CadesBrowserPlugin>, CADESPluginAsync<CadesBrowserPlugin> {
	private constructor(private _pluginObject: CADESPluginAsyncObject | CADESPluginSyncObject) {
	}

	static init(options: Partial<CadesBrowserPluginOptions> = {}): Promise<CadesBrowserPlugin> {
		const pluginOptions: CadesBrowserPluginOptions = Object.assign({}, defaultOptions, options || {});
		return new Promise<CadesBrowserPlugin>(async (resolve, reject) => {
			let pluginObject: CADESPluginAsyncObject | CADESPluginSyncObject | undefined;
			let rejected: boolean = false;
			let rejectFn: (rejectValue: any) => void = (rejectValue: any) => {
				if (rejected) {
					return;
				}
				rejected = true;
				reject(rejectValue);
			};
			try {
				setTimeout(() => rejectFn(new Error("Таймаут загрузки плагина")), pluginOptions.timeout);
				if (!BrowserDetector.isIE) {
					pluginObject = await new CadesExtension().init();
				}
				else {
					pluginObject = await new CadesNPAPI().init();
				}
				resolve(new CadesBrowserPlugin(pluginObject));
			}
			catch (e) {
				rejectFn(e);
			}
		});
	}

	get isAsync(): boolean {
		return this._pluginIsAsync();
	}

	private _pluginIsAsync(pluginObject: CADESPluginAsyncObject | CADESPluginSyncObject = this._pluginObject): pluginObject is CADESPluginAsyncObject {
		return "CreateObjectAsync" in this._pluginObject;
	}

	CreateObject<T extends keyof ObjectNames>(objName: T): ObjectNames[T] {
		if (!this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.CreateObject(objName);
		}
		throw new Error("Синхронный интерфейс не поддерживается");
	}

	async CreateObjectAsync<T extends keyof ObjectNamesAsync>(objName: T): Promise<ObjectNamesAsync[T]> {
		if (this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.CreateObjectAsync(objName);
		}
		throw new Error("Асинхронный интерфейс не поддерживается");
	}

	async ReleasePluginObjects(): Promise<boolean> {
		if (this._pluginIsAsync(this._pluginObject)) {
			return this._pluginObject.ReleasePluginObjects();
		}
		throw new Error("Асинхронный интерфейс не поддерживается");
	}
}
