import {
	About,
	AboutAsync,
	CadesSignedData,
	CadesSignedDataAsync,
	CPAttribute,
	CPAttributeAsync,
	CPHashedData,
	CPHashedDataAsync,
	CPSigner,
	CPSignerAsync,
	RawSignature,
	RawSignatureAsync,
	SignedXML,
	SignedXMLAsync
} from "./cadescom";
import {
	Store,
	StoreAsync
} from "./capicom";

export interface ObjectNames {
	"CAdESCOM.Store": Store;
	"CAdESCOM.CPSigner": CPSigner;
	"CAdESCOM.About": About;
	"CAdESCOM.SignedXML": SignedXML;
	"CAdESCOM.HashedData": CPHashedData;
	"CAdESCOM.CadesSignedData": CadesSignedData;
	"CAdESCOM.CPAttribute": CPAttribute;
	"CAdESCOM.RawSignature": RawSignature;
}

export interface ObjectNamesAsync {
	"CAdESCOM.Store": StoreAsync;
	"CAdESCOM.CPSigner": CPSignerAsync;
	"CAdESCOM.About": AboutAsync;
	"CAdESCOM.SignedXML": SignedXMLAsync;
	"CAdESCOM.HashedData": CPHashedDataAsync;
	"CAdESCOM.CadesSignedData": CadesSignedDataAsync;
	"CAdESCOM.CPAttribute": CPAttributeAsync;
	"CAdESCOM.RawSignature": RawSignatureAsync;
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

export interface CADESPluginBase<T>
	// StoreLocationPlugin, StoreLocationPlugin, StoreNamePlugin,
	// StoreOpenModePlugin, CAPICOM_CERTIFICATE_FIND_TYPE,
	// LogLevel, CADESCOM_XML_SIGNATURE_TYPE,
	// ISignedXmlUrls, CADESCOM_CADES_TYPE,
	// IEncodingType, CAPICOM_CERTIFICATE_INCLUDE_OPTION,
	// CertIntoTypePlugin, KeyUsagePlugin,
	// PropIDPlugin, OIDPlugin, EKUPlugin,
	// CAPICOM_ATTRIBUTE, CADESCOM_ATTRIBUTE,
	// CADESCOM_CONTENT_ENCODING_TYPE, CADESCOM_DISPLAY_DATA,
	// CADESCOM_ENCRYPTION_ALGORITHM, CADESCOM_HASH_ALGORITHM,
	// CADESCOM_InstallResponseRestrictionFlags
{

	// readonly JSModuleVersion: string;
	// readonly current_log_level: number;
	//
	// set_log_level(level: LogLevel): void;
	//
	// getLastError(exception: Error): string;
}

export interface CADESPluginAsyncObject {
	CreateObjectAsync<T extends keyof ObjectNamesAsync>(objName: T): Promise<ObjectNamesAsync[T]>;

	ReleasePluginObjects(): Promise<boolean>;
}

export interface CADESPluginSyncObject {
	CreateObject<T extends keyof ObjectNames>(objName: T): ObjectNames[T];
}

export interface CADESPluginAsync<T> extends CADESPluginBase<T>, CADESPluginAsyncObject {
}

export interface CADESPluginSync<T> extends CADESPluginBase<T>, CADESPluginSyncObject {
}

export type CADESPlugin<T> = CADESPluginAsync<T> | CADESPluginSync<T>;
