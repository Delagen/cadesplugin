import {
    ICPCertificate,
    ICPCertificateAsync,
    ICPCertificates,
    ICPCertificatesAsync,
    ICPHashedData,
    ICPHashedDataAsync,
    ICPRecipients,
    ICPRecipientsAsync,
    ICPSigner,
    ICPSignerAsync,
    ICPStore,
    ICPStoreAsync,
    IPrivateKey,
    IPrivateKeyAsync,
    IVersion,
    IVersionAsync,
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
    IPublicKeyAsync,
    IStore,
    IStoreAsync,
} from "./capicom";

//note: extracts the type if wrapped by a Promise
export type Unpacked<T> = T extends Promise<infer U> ? U :
    T extends ICPStore<infer R> ? ICPStoreAsync<R> :
        T extends IStore<infer R> ? IStoreAsync<R> :
            T extends ICPCertificate ? ICPCertificateAsync :
                T extends ICertificate ? ICertificateAsync :
                    T extends ICPCertificates<infer R> ? ICPCertificatesAsync<R> :
                        T extends ICertificates<infer R> ? ICertificatesAsync<R> :
                            T extends ICPSigner ? ICPSignerAsync :
                                T extends ICPHashedData ? ICPHashedDataAsync :
                                    T extends ICPRecipients ? ICPRecipientsAsync :
                                        T extends IVersion ? IVersionAsync :
                                            T extends IOID ? IOIDAsync :
                                                T extends IEncodedData ? IEncodedDataAsync :
                                                    T extends IPublicKey ? IPublicKeyAsync :
                                                        T extends IPrivateKey ? IPrivateKeyAsync :
                                                            T;

export type PromisifiedFunction<T extends Function> = //tslint:disable-line ban-types
    T extends (...args: infer A) => infer U ? (...args: { [K in keyof A]: Unpacked<A[K]> }) => Promise<Unpacked<U>> :
        T;

export type Async<T> = {
    readonly [K in keyof T]: T[K] extends Function ? PromisifiedFunction<T[K]> : //tslint:disable-line ban-types
        Promise<Unpacked<T[K]>>;
};
