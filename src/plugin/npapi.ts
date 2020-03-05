import {BrowserDetector} from "../browser-detector";
import {ICADESPluginSyncObject} from "../interfaces";

declare const ActiveXObject: new (name: string) => any;
declare const call_ru_cryptopro_npcades_10_native_bridge: (method: string, args: [string]) => any;

export class CadesNPAPI {
	async init(): Promise<ICADESPluginSyncObject> {
		const cadesPluginObject: HTMLObjectElement = document.createElement("object");
		cadesPluginObject.type = "application/x-cades";
		cadesPluginObject.style.visibility = "hidden";
		document.body.appendChild(cadesPluginObject);
		let CreateObject: (name: string) => any;

		if (BrowserDetector.isIE) {
			const certEnrollClassFactory: HTMLObjectElement = document.createElement("object");
			certEnrollClassFactory.setAttribute("classid", "clsid:884e2049-217d-11da-b2a4-000e7bbb2b09");
			certEnrollClassFactory.style.visibility = "hidden";
			document.body.appendChild(certEnrollClassFactory);

			const webClassFactory: HTMLObjectElement = document.createElement("object");
			webClassFactory.setAttribute("classid", "clsid:B04C8637-10BD-484E-B0DA-B8A039F60024");
			webClassFactory.style.visibility = "hidden";
			document.body.appendChild(webClassFactory);
			CreateObject = (name: string) => {
				if (name.match(/X509Enrollment/i)) {
					try {
						//note: Объекты CertEnroll создаются через CX509EnrollmentWebClassFactory
						return (<any> certEnrollClassFactory).CreateObject(name);
					}
					catch (e) {
						throw new Error("Для создания обьектов X509Enrollment следует настроить веб-узел на использование проверки подлинности по протоколу HTTPS");
					}
				}
				//note: Объекты CAPICOM и CAdESCOM создаются через CAdESCOM.WebClassFactory
				try {
					return (<any> webClassFactory).CreateObject(name);
				}
				catch (e) {
					//note: Для версий плагина ниже 2.0.12538
					return new ActiveXObject(name);
				}
			};
		}
		else if (BrowserDetector.isIOS) {
			CreateObject = (name) => call_ru_cryptopro_npcades_10_native_bridge("CreateObject", [name]);
		}
		else {
			CreateObject = (name) => (<any> cadesPluginObject).CreateObject(name);
		}

		try {
			CreateObject("CAdESCOM.About");
		}
		catch (err) {
			throw new Error("Ошибка при загрузке плагина");
		}

		return {CreateObject};
	}
}
