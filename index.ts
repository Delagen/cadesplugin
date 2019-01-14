import * as exported from "./export";
import { CadesBrowserPluginLoader } from "./src";

export * from "./src";

const plugin: CadesBrowserPluginLoader = new CadesBrowserPluginLoader();

(<any> window).cadesplugin = plugin;

declare global {
	const cadesplugin: CadesBrowserPluginLoader & typeof exported;
}
