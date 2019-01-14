import { VarDate } from "../util";
import {
	CAPICOM_CERT_INFO_TYPE,
	CAPICOM_CERTIFICATE_FIND_TYPE,
	CAPICOM_CERTIFICATE_INCLUDE_OPTION,
	CAPICOM_ENCODING_TYPE,
	CAPICOM_OID,
	CAPICOM_STORE_LOCATION,
	CAPICOM_STORE_NAME,
	CAPICOM_STORE_OPEN_MODE
} from "./capicom-enums";

export interface IEncodedData {
	readonly Format: string;

	Value(EncodingType?: CAPICOM_ENCODING_TYPE): string;
}

export interface IOID {
	FriendlyName: string;
	Name: CAPICOM_OID;
	Value: string;
}

export interface IPublicKey {
	readonly Algorithm: IOID;
	readonly EncodedKey: IEncodedData;
	readonly EncodedParameters: IEncodedData;
	readonly Length: number;
}

export interface ICertificate {
	readonly Version: number;
	readonly Thumbprint: string;
	readonly SubjectName: string;
	readonly SerialNumber: string;
	readonly IssuerName: string;
	readonly ValidFromDate: VarDate;
	readonly ValidToDate: VarDate;

	HasPrivateKey(): boolean;

	GetInfo(infoType: CAPICOM_CERT_INFO_TYPE): string;

	IsValid(): ICertificateStatus;

	Display(): void;

	PublicKey(): IPublicKey;

	Export(EncodingType: CAPICOM_ENCODING_TYPE): string;
}

export interface ICertificateStatus {
	// TODO
}

export interface ICertificates {
	readonly Count: number;

	Item(index: number): ICertificate;

	Find(findType: CAPICOM_CERTIFICATE_FIND_TYPE, varCriteria?: any, bFindValidOnly?: boolean): ICertificates;

	Select(title?: string, displayString?: string, bMultiSelect?: boolean): ICertificates;
}

export interface Store {
	readonly Certificates: ICertificates;
	readonly Location: CAPICOM_STORE_LOCATION;
	readonly Name: string;

	Open(location?: CAPICOM_STORE_LOCATION, name?: CAPICOM_STORE_NAME, openMode?: CAPICOM_STORE_OPEN_MODE): void;

	Close(): void;

	Delete(): boolean;

	Import(encodedStore: string): void;
}

export interface Signers {
	readonly Count: number;

	Item(index: number): Signer;
}

export interface Signer {
	//readonly AuthenticatedAttributes
	Certificate: ICertificate;
	//Chain
	Options: CAPICOM_CERTIFICATE_INCLUDE_OPTION;

	Load(fileName: string, password?: string): void;
}
