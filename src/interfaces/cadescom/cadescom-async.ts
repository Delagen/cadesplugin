import {
	CAPICOM_CERTIFICATE_INCLUDE_OPTION,
	CAPICOM_ENCODING_TYPE,
	CAPICOM_HASH_ALGORITHM,
	ICertificateAsync
} from "../capicom";
import {Async} from "../util";
import {
	IAbout,
	ICadesSignedData,
	ICPAttribute,
	ICPHashedData,
	ICPSigner,
	ICPSigners,
	IRawSignature,
	ISignedXML,
	IVersion
} from "./cadescom";
import {
	CADESCOM_ATTRIBUTE,
	CADESCOM_CONTENT_ENCODING_TYPE,
	CADESCOM_DISPLAY_DATA,
	CADESCOM_XML_SIGNATURE_TYPE
} from "./cadescom-enums";

export interface ICPSignerAsync extends Async<ICPSigner> {
	propset_Certificate(certificate: ICertificateAsync): Promise<void>;

	propset_CheckCertificate(checkCertificate: boolean): Promise<void>;

	propset_KeyPin(keyPin: string): Promise<void>;

	propset_Options(options: CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void>;

	propset_TSAAddress(TSAAddress: string): Promise<void>;
}

export interface ICadesSignedDataAsync extends Async<ICadesSignedData> {
	propset_DisplayData(displayData: CADESCOM_DISPLAY_DATA): Promise<void>;

	propset_Content(content: string): Promise<void>;

	propset_ContentEncoding(contentEncoding: CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;
}

export interface IVersionAsync extends Async<IVersion> {
}

export interface IAboutAsync extends Async<IAbout> {
}

export interface ICPSignersAsync extends Async<ICPSigners> {
}

export interface ISignedXMLAsync extends Async<ISignedXML> {
	propset_Content(content: string): Promise<void>;

	propset_DigestMethod(digestMethod: string): Promise<void>;

	propset_SignatureMethod(signatureMethod: string): Promise<void>;

	propset_SignatureType(signatureType: CADESCOM_XML_SIGNATURE_TYPE): Promise<void>;
}

export interface ICPHashedDataAsync extends Async<ICPHashedData> {
	propset_Algorithm(algorithm: CAPICOM_HASH_ALGORITHM): Promise<void>;

	propset_DataEncoding(dataEncoding: CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;
}

export interface ICPAttributeAsync extends Async<ICPAttribute> {
	propset_Name(name: CADESCOM_ATTRIBUTE): Promise<void>;

	propset_Value(value: any): Promise<void>;

	propset_ValueEncoding(valueEncoding: CAPICOM_ENCODING_TYPE): Promise<void>;
}

export interface IRawSignatureAsync extends Async<IRawSignature> {
}
