import { BrowserDetector } from "../browser-detector";
import { CADESPluginAsyncObject } from "../interfaces";
import { loadScript } from "../util";

interface ICadesExtension {
	CreatePluginObject(): Promise<any>;
}

declare const cpcsp_chrome_nmcades: ICadesExtension | undefined;

// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.appx
// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/cryptoprotest.cert
// http://cryptopro.ru/sites/default/files/products/cades/nmcades_uwp/nmcades_uwp.docx

export class CadesExtension {
	async init(): Promise<CADESPluginAsyncObject> {
		if (BrowserDetector.isEdge || BrowserDetector.isFirefox) {
			await new Promise((resolve, reject) => {
				const pluginLoadedHandler: (event: MessageEvent) => Promise<void> = async (event) => {
					if (typeof (event.data) !== "string" || !event.data.match("cadesplugin_loaded")) {
						return;
					}
					try {
						await loadScript(event.data.split("url:").slice(1).join(""));
						resolve();
					}
					catch (e) {
						reject(e);
					}
					window.removeEventListener("message", pluginLoadedHandler, false);
				};
				window.addEventListener("message", pluginLoadedHandler, false);
				window.postMessage("cadesplugin_echo_request", "*");
			});
		}
		else {
			try {
				//extension 2.0
				await loadScript("chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js");
			}
			catch {
				try {
					//extension 1.5
					await loadScript("chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js");
				}
				catch {

				}
			}
		}
		if (typeof cpcsp_chrome_nmcades !== "undefined") {
			const pluginObject = await cpcsp_chrome_nmcades.CreatePluginObject();
			await pluginObject.CreateObjectAsync("CAdESCOM.About");
			return pluginObject;
		}
		throw new Error("Плагин недоступен");
	}
}

// function nmcades_api_onload () {
// 	window.postMessage("cadesplugin_echo_request", "*");
// 	window.addEventListener("message", function (event){
// 		if (typeof(event.data) != "string" || !event.data.match("cadesplugin_loaded"))
// 			return;
// 		if(isFireFox || isEdge)
// 		{
// 			// Для Firefox вместе с сообщением cadesplugin_loaded прилетает url для загрузки nmcades_plugin_api.js
// 			var url = event.data.substring(event.data.indexOf("url:") + 4);
// 			var fileref = document.createElement('script');
// 			fileref.setAttribute("type", "text/javascript");
// 			fileref.setAttribute("src", url);
// 			fileref.onerror = plugin_loaded_error;
// 			fileref.onload = firefox_or_edge_nmcades_onload;
// 			document.getElementsByTagName("head")[0].appendChild(fileref);
// 			// Для Firefox и Edge у нас только по одному расширению.
// 			failed_extensions++;
// 		}else {
// 			cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
// 		}
// 	}, false);
// }
