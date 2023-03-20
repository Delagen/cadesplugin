import { Async } from "../util";
import {
    ICertificate,
    ICertificates,
    IEncodedData,
    IOID,
    IPublicKey,
    IStore,
} from "./capicom";

export interface ICertificateAsync extends Async<ICertificate> {
}

export interface ICertificatesAsync<T = ICertificate> extends Async<ICertificates<T>> {
}

export interface IStoreAsync<T = ICertificate> extends Async<IStore<T>> {
}

export interface IEncodedDataAsync extends Async<IEncodedData> {
}

export interface IOIDAsync extends Async<IOID> {
}

export interface IPublicKeyAsync extends Async<IPublicKey> {
}
