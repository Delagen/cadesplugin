import {
	CAPICOM_CERTIFICATE_INCLUDE_OPTION,
	CAPICOM_ENCODING_TYPE,
	CAPICOM_HASH_ALGORITHM,
	ICertificateAsync
} from "../capicom";
import { Async } from "../util";
import {
	About,
	CadesSignedData,
	CPAttribute,
	CPHashedData,
	CPSigner,
	CPSigners,
	RawSignature,
	SignedXML,
	Version
} from "./cadescom";
import {
	CADESCOM_ATTRIBUTE,
	CADESCOM_CONTENT_ENCODING_TYPE,
	CADESCOM_DISPLAY_DATA,
	CADESCOM_XML_SIGNATURE_TYPE
} from "./cadescom-enums";

export interface CPSignerAsync extends Async<CPSigner> {
	propset_Certificate(certificate: ICertificateAsync): Promise<void>;

	propset_CheckCertificate(checkCertificate: boolean): Promise<void>;

	propset_KeyPin(keyPin: string): Promise<void>

	propset_Options(options: CAPICOM_CERTIFICATE_INCLUDE_OPTION): Promise<void>

	propset_TSAAddress(TSAAddress: string): Promise<void>;
}

export interface CadesSignedDataAsync extends Async<CadesSignedData> {
	propset_DisplayData(displayData: CADESCOM_DISPLAY_DATA): Promise<void>;

	propset_Content(content: string): Promise<void>;

	propset_ContentEncoding(contentEncoding: CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;
}

export interface VersionAsync extends Async<Version> {
}

export interface AboutAsync extends Async<About> {
}

export interface CPSignersAsync extends Async<CPSigners> {
}

export interface SignedXMLAsync extends Async<SignedXML> {
	propset_Content(content: string): Promise<void>;

	propset_DigestMethod(digestMethod: string): Promise<void>;

	propset_SignatureMethod(signatureMethod: string): Promise<void>;

	propset_SignatureType(signatureType: CADESCOM_XML_SIGNATURE_TYPE): Promise<void>;
}

export interface CPHashedDataAsync extends Async<CPHashedData> {
	propset_Algorithm(algorithm: CAPICOM_HASH_ALGORITHM): Promise<void>;

	propset_DataEncoding(dataEncoding: CADESCOM_CONTENT_ENCODING_TYPE): Promise<void>;
}

export interface CPAttributeAsync extends Async<CPAttribute> {
	propset_Name(name: CADESCOM_ATTRIBUTE): Promise<void>;

	propset_Value(value: any): Promise<void>;

	propset_ValueEncoding(valueEncoding: CAPICOM_ENCODING_TYPE): Promise<void>;
}

export interface RawSignatureAsync extends Async<RawSignature> {
}
