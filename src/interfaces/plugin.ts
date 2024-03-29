import {
    IAbout,
    IAboutAsync,
    ICadesSignedData,
    ICadesSignedDataAsync,
    ICPAttribute,
    ICPAttributeAsync,
    ICPEnvelopedData,
    ICPEnvelopedDataAsync,
    ICPHashedData,
    ICPHashedDataAsync,
    ICPSigner,
    ICPSignerAsync,
    ICPStore,
    ICPStoreAsync,
    IRawSignature,
    IRawSignatureAsync,
    ISignedXML,
    ISignedXMLAsync,
} from "./cadescom";

export interface IObjectNamesMapSync {
    "CAdESCOM.Store": ICPStore;
    "CAdESCOM.CPEnvelopedData": ICPEnvelopedData;
    "CAdESCOM.CPSigner": ICPSigner;
    "CAdESCOM.About": IAbout;
    "CAdESCOM.SignedXML": ISignedXML;
    "CAdESCOM.HashedData": ICPHashedData;
    "CAdESCOM.CadesSignedData": ICadesSignedData;
    "CAdESCOM.CPAttribute": ICPAttribute;
    "CAdESCOM.RawSignature": IRawSignature;
}

export interface IObjectNamesMapAsync {
    "CAdESCOM.Store": ICPStoreAsync;
    "CAdESCOM.CPEnvelopedData": ICPEnvelopedDataAsync;
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
    XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411",
    XmlDsigGost3410Url2012256 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256",
    XmlDsigGost3411Url2012256 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256",
    XmlDsigGost3410Url2012512 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-512",
    XmlDsigGost3411Url2012512 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-512"
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
