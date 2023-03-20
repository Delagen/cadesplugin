import {
    CAPICOM_CERT_INFO_TYPE,
    CAPICOM_CERTIFICATE_FIND_TYPE,
    CAPICOM_CERTIFICATE_INCLUDE_OPTION,
    CAPICOM_ENCODING_TYPE,
    CAPICOM_OID,
    CAPICOM_STORE_LOCATION,
    CAPICOM_STORE_NAME,
    CAPICOM_STORE_OPEN_MODE,
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
    readonly ValidFromDate: string;
    readonly ValidToDate: string;

    HasPrivateKey(): boolean;

    GetInfo(infoType: CAPICOM_CERT_INFO_TYPE): string;

    IsValid(): ICertificateStatus;

    Display(): void;

    PublicKey(): IPublicKey;

    Export(EncodingType: CAPICOM_ENCODING_TYPE): string;
}

export interface ICertificateStatus {
    Result: boolean;
}

export interface ICertificates<T = ICertificate> {
    readonly Count: number;

    Item(index: number): T;

    Find(findType: CAPICOM_CERTIFICATE_FIND_TYPE, varCriteria?: any, bFindValidOnly?: boolean): ICertificates<T>;

    Select(title?: string, displayString?: string, bMultiSelect?: boolean): ICertificates<T>;
}

export interface IStore<T = ICertificates> {
    readonly Certificates: T;
    readonly Location: CAPICOM_STORE_LOCATION;
    readonly Name: string;

    Open(location?: CAPICOM_STORE_LOCATION, name?: CAPICOM_STORE_NAME, openMode?: CAPICOM_STORE_OPEN_MODE): void;

    Close(): void;

    Delete(): boolean;

    Import(encodedStore: string): void;
}

export interface ISigners {
    readonly Count: number;

    Item(index: number): ISigner;
}

export interface ISigner {
    Certificate: ICertificate;
    Options: CAPICOM_CERTIFICATE_INCLUDE_OPTION;

    Load(fileName: string, password?: string): void;
}
