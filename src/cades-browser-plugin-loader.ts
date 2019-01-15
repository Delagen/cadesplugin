import { CadesBrowserPlugin } from "./cades-browser-plugin";
import { LogLevel } from "./interfaces";

export class CadesBrowserPluginLoader implements Promise<CadesBrowserPlugin> {
	private _pluginPromise?: Promise<CadesBrowserPlugin>;

	//note: CryptoPro ugly plugin code
	readonly LOG_LEVEL_DEBUG: LogLevel = LogLevel.LOG_LEVEL_DEBUG;
	readonly LOG_LEVEL_INFO: LogLevel = LogLevel.LOG_LEVEL_INFO;
	readonly LOG_LEVEL_ERROR: LogLevel = LogLevel.LOG_LEVEL_ERROR;

	current_log_level: number = LogLevel.LOG_LEVEL_DEBUG; //tslint:disable-line variable-name

	private get _plugin(): Promise<CadesBrowserPlugin> {
		if (!this._pluginPromise) {
			this._pluginPromise = CadesBrowserPlugin.Init();
		}
		return this._pluginPromise;
	}

	get [Symbol.toStringTag](): "Promise" {
		return "Promise";
	}

	then<TF = CadesBrowserPlugin, TC = never>(onFulfilled?: ((value: CadesBrowserPlugin) => (PromiseLike<TF> | TF)) | null,
											  onRejected?: ((reason: any) => (PromiseLike<TC> | TC)) | null): Promise<TF | TC> {
		return this._plugin.then(onFulfilled, onRejected);
	}

	catch<TC = never>(onRejected?: ((reason: any) => (PromiseLike<TC> | TC)) | null): Promise<any | TC> {
		return this._plugin.catch(onRejected);
	}
}
