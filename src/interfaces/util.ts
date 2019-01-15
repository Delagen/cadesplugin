import {
	ICPHashedData,
	ICPHashedDataAsync,
	ICPSigner,
	ICPSignerAsync,
	IVersion,
	IVersionAsync
} from "./cadescom";
import {
	ICertificate,
	ICertificateAsync,
	ICertificates,
	ICertificatesAsync,
	IEncodedData,
	IEncodedDataAsync,
	IOID,
	IOIDAsync,
	IPublicKey,
	IPublicKeyAsync
} from "./capicom";

export type VarDate = object;

//note: extracts the type if wrapped by a Promise
export type Unpacked<T> = T extends Promise<infer U> ? U :
						  T extends ICertificate ? ICertificateAsync :
						  T extends ICertificates ? ICertificatesAsync :
						  T extends ICPSigner ? ICPSignerAsync :
						  T extends ICPHashedData ? ICPHashedDataAsync :
						  T extends IVersion ? IVersionAsync :
						  T extends IOID ? IOIDAsync :
						  T extends IEncodedData ? IEncodedDataAsync :
						  T extends IPublicKey ? IPublicKeyAsync :
						  T;

export type PromisifiedFunction<T extends () => void> =
	T extends (...args: infer A) => infer U ? (...args: { [K in keyof A]: Unpacked<A[K]> }) => Promise<Unpacked<U>> :
	T;

export type Async<T> = {
	readonly [K in keyof T]: T[K] extends () => void ? PromisifiedFunction<T[K]> :
							 Promise<Unpacked<T[K]>>;
};
