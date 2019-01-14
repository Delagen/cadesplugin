import { BrowserDetector } from "../browser-detector";
import { CADESPluginSyncObject } from "../interfaces";

declare const ActiveXObject: new (name: string) => any;
declare const call_ru_cryptopro_npcades_10_native_bridge: (method: string, args: [string]) => any;

// function wrapObject<T extends object>(obj: T): any {
// 	if (typeof obj === "object") {
// 		const newObj: any = {};
// 		for (const propName in obj) {
// 			//console.log(propName,typeof obj[propName]);
// 			if (obj.hasOwnProperty(propName)) {
// 				console.log("own", propName);
// 				const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(obj, propName);
// 				if (descriptor) {
// 					if (descriptor.get) {
// 						Object.defineProperty(newObj, propName, {
// 							get(): any {
// 								return Promise.resolve(obj[propName]);
// 							}
// 						});
// 						continue;
// 					}
// 					const propertyValue: any = descriptor.value;
// 					if (typeof propertyValue !== "undefined") {
// 						if (typeof propertyValue === "function") {
// 							newObj[propName] = (...args: any[]) => Promise.resolve(wrapObject(propertyValue.apply(obj, args)));
// 							continue;
// 						}
// 						newObj[propName] = Promise.resolve(wrapObject(propertyValue));
// 						if (descriptor.writable) {
// 							newObj[`propset_${propName}`] = (arg: any) => {
// 								obj[propName] = arg;
// 								return Promise.resolve();
// 							};
// 						}
// 					}
// 				}
// 			}
// 		}
// 		return newObj;
// 	}
// 	return obj;
// }

export class CadesNPAPI {
	async init(): Promise<CADESPluginSyncObject> {
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
						// Объекты CertEnroll создаются через CX509EnrollmentWebClassFactory
						return (<any> certEnrollClassFactory).CreateObject(name);
					}
					catch (e) {
						throw new Error("Для создания обьектов X509Enrollment следует настроить веб-узел на использование проверки подлинности по протоколу HTTPS");
					}
				}
				// Объекты CAPICOM и CAdESCOM создаются через CAdESCOM.WebClassFactory
				try {
					return (<any> webClassFactory).CreateObject(name);
				}
				catch (e) {
					// Для версий плагина ниже 2.0.12538
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
