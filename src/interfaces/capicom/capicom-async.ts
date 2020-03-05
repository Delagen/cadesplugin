import {Async} from "../util";
import {
	ICertificate,
	ICertificates,
	IEncodedData,
	IOID,
	IPublicKey,
	IStore
} from "./capicom";

export interface ICertificateAsync extends Async<ICertificate> {
}

export interface ICertificatesAsync extends Async<ICertificates> {
}

export interface IStoreAsync extends Async<IStore> {
}

export interface IEncodedDataAsync extends Async<IEncodedData> {
}

export interface IOIDAsync extends Async<IOID> {
}

export interface IPublicKeyAsync extends Async<IPublicKey> {
}
