import {
	CAPICOM_CERTIFICATE_INCLUDE_OPTION,
	CAPICOM_ENCODING_TYPE,
	CAPICOM_HASH_ALGORITHM,
	ICertificate,
	ICertificates,
	Signers
} from "../capicom";
import { VarDate } from "../util";
import {
	CADESCOM_ATTRIBUTE,
	CADESCOM_CADES_TYPE,
	CADESCOM_CONTENT_ENCODING_TYPE,
	CADESCOM_DISPLAY_DATA,
	CADESCOM_XML_SIGNATURE_TYPE
} from "./cadescom-enums";

export interface CPSigner {
	//AuthenticatedAttributes2
	Certificate: ICertificate;
	//Chain
	CheckCertificate: boolean;

	//AuthenticatedAttributes
	//CRLs;
	KeyPin: string;
	//OCSPResponses
	Options: CAPICOM_CERTIFICATE_INCLUDE_OPTION;
	//SignatureStatus
	readonly SignatureTimeStampTime: VarDate;
	readonly SigningTime: VarDate;
	TSAAddress: string;

	Display(hwndParent?: number, title?: string): void;

	Load(fileName: string, password?: string): void;

	//UnauthenticatedAttributes
}

export interface CadesSignedData {
	//VerifyHash
	//SignHash

	readonly Certificates: ICertificates;
	Content: string;
	ContentEncoding: CADESCOM_CONTENT_ENCODING_TYPE;

	DisplayData: CADESCOM_DISPLAY_DATA;

	Display(hwndParent?: number, title?: string): void;

	EnhanceCades(cadesType?: CADESCOM_CADES_TYPE, TSAAddress?: string, encodingType?: CAPICOM_ENCODING_TYPE): string;

	SignCades(signer?: CPSigner, CadesType?: CADESCOM_CADES_TYPE, bDetached?: boolean, EncodingType?: CAPICOM_ENCODING_TYPE): string;

	VerifyCades(SignedMessage: string, CadesType?: CADESCOM_CADES_TYPE, bDetached?: boolean): void;
}

export interface Version {
	readonly BuildVersion: number;
	readonly MajorVersion: number;
	readonly MinorVersion: number;
	readonly toStringDefault: string;

	toString(): string;
}

export interface About {
	readonly BuildVersion: number;
	readonly MajorVersion: number;
	readonly MinorVersion: number;
	readonly PluginVersion: Version;
	readonly Version: string;

	CSPName(ProviderType?: number): string;

	CSPVersion(ProviderName?: string, ProviderType?: number): Version;

	ProviderVersion(ProviderName?: string, ProviderType?: number): string;

	toString(): string;
}

export interface CPSigners {
	readonly Count: number;

	Item(index: number): CPSigner;
}

export interface SignedXML {
	Content: string;
	DigestMethod: string;
	SignatureMethod: string;
	SignatureType: CADESCOM_XML_SIGNATURE_TYPE;
	readonly Signers: Signers;

	Sign(signer?: CPSigner, XPath?: string): string;

	Verify(SignedMessage: string, XPath?: string): void;
}

export interface CPHashedData {
	Algorithm: CAPICOM_HASH_ALGORITHM;
	DataEncoding: CADESCOM_CONTENT_ENCODING_TYPE;
	Value: string;

	Hash(newVal: string): void;

	SetHashValue(newVal: string): void;
}

export interface CPAttribute {
	Name: CADESCOM_ATTRIBUTE;
	//OID: IOID;
	Value: any;
	ValueEncoding: CAPICOM_ENCODING_TYPE;
}

export interface RawSignature {
	SignHash(hash: CPHashedData, certificate?: string): string;

	VerifyHash(hash: CPHashedData, certificate: ICertificate, signature: string): void;
}
