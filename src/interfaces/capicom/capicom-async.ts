import { Async } from "../util";
import {
	ICertificate,
	ICertificates,
	IEncodedData,
	IOID,
	IPublicKey,
	Store
} from "./capicom";

export interface ICertificateAsync extends Async<ICertificate> {
}

export interface ICertificatesAsync extends Async<ICertificates> {
}

export interface StoreAsync extends Async<Store> {
}

export interface IEncodedDataAsync extends Async<IEncodedData> {
}

export interface IOIDAsync extends Async<IOID> {
}

export interface IPublicKeyAsync extends Async<IPublicKey> {
}
