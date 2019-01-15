import {
	IAbout,
	IAboutAsync,
	ICadesSignedData,
	ICadesSignedDataAsync,
	ICPAttribute,
	ICPAttributeAsync,
	ICPHashedData,
	ICPHashedDataAsync,
	ICPSigner,
	ICPSignerAsync,
	IRawSignature,
	IRawSignatureAsync,
	ISignedXML,
	ISignedXMLAsync
} from "./cadescom";
import {
	IStore,
	IStoreAsync
} from "./capicom";

export interface IObjectNamesMapSync {
	"CAdESCOM.Store": IStore;
	"CAdESCOM.CPSigner": ICPSigner;
	"CAdESCOM.About": IAbout;
	"CAdESCOM.SignedXML": ISignedXML;
	"CAdESCOM.HashedData": ICPHashedData;
	"CAdESCOM.CadesSignedData": ICadesSignedData;
	"CAdESCOM.CPAttribute": ICPAttribute;
	"CAdESCOM.RawSignature": IRawSignature;
}

export interface IObjectNamesMapAsync {
	"CAdESCOM.Store": IStoreAsync;
	"CAdESCOM.CPSigner": ICPSignerAsync;
	"CAdESCOM.About": IAboutAsync;
	"CAdESCOM.SignedXML": ISignedXMLAsync;
	"CAdESCOM.HashedData": ICPHashedDataAsync;
	"CAdESCOM.CadesSignedData": ICadesSignedDataAsync;
	"CAdESCOM.CPAttribute": ICPAttributeAsync;
	"CAdESCOM.RawSignature": IRawSignatureAsync;
}

export const enum LogLevel {
	LOG_LEVEL_DEBUG = 4,
	LOG_LEVEL_INFO = 2,
	LOG_LEVEL_ERROR = 1
}

export const enum SignedXmlUrls {
	XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411",
	XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411",
	XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411",
	XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411"
}

export const enum IEncodingType {
	CADESCOM_ENCODE_ANY = -1,
	CADESCOM_ENCODE_BASE64 = 0,
	CADESCOM_ENCODE_BINARY = 1
}

export interface ICADESPluginBase<T> {
	readonly isAsync: boolean;
	// set_log_level(level: LogLevel): void;
	//
	// getLastError(exception: Error): string;
}

export interface ICADESPluginAsyncObject {
	CreateObjectAsync<T extends keyof IObjectNamesMapAsync>(objName: T): Promise<IObjectNamesMapAsync[T]>;

	ReleasePluginObjects(): Promise<boolean>;
}

export interface ICADESPluginSyncObject {
	CreateObject<T extends keyof IObjectNamesMapSync>(objName: T): IObjectNamesMapSync[T];
}

export interface ICADESPluginAsync<T> extends ICADESPluginBase<T>, ICADESPluginAsyncObject {
}

export interface ICADESPluginSync<T> extends ICADESPluginBase<T>, ICADESPluginSyncObject {
}
