import {
    CadesBrowserPlugin,
    CAPICOM_CERTIFICATE_FIND_TYPE,
    CAPICOM_ENCODING_TYPE,
    CAPICOM_STORE_LOCATION,
    CAPICOM_STORE_NAME,
    CAPICOM_STORE_OPEN_MODE
} from "../src";

(async () => {
    const certSignatureSubjectName = "SignCert";
    const certEncryptSubjectName = "EncryptCert";
    const plugin = await CadesBrowserPlugin.Init();
    const oStore = await plugin.CreateObjectAsync("CAdESCOM.Store");

    await oStore.Open(CAPICOM_STORE_LOCATION.CAPICOM_CURRENT_USER_STORE, CAPICOM_STORE_NAME.CAPICOM_MY_STORE, CAPICOM_STORE_OPEN_MODE.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

    let oCertificatesObj;
    let count;

    oCertificatesObj= await oStore.Certificates;
    const signatureCertificates = await oCertificatesObj.Find(CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certSignatureSubjectName);
    count = await signatureCertificates.Count;
    if (count === 0) {
        alert("Certificate not found: " + certSignatureSubjectName);
        return;
    }
    const oCertSignature = await signatureCertificates.Item(1);

    oCertificatesObj = await oStore.Certificates;
    const encryptCertificates = await oCertificatesObj.Find(CAPICOM_CERTIFICATE_FIND_TYPE.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME, certEncryptSubjectName);
    count = await encryptCertificates.Count;
    if (count === 0) {
        alert("Certificate not found: " + certEncryptSubjectName);
        return;
    }
    const oCertEncrypt = await encryptCertificates.Item(1);

    await oStore.Close();

    const oEnvelopedData = await plugin.CreateObjectAsync("CAdESCOM.CPEnvelopedData");
    const expectedContent = "Message to encrypt с русскими буквами";
    await oEnvelopedData.propset_Content(expectedContent);

    const oRecipients = await oEnvelopedData.Recipients;
    await oRecipients.Add(oCertSignature);
    await oRecipients.Add(oCertEncrypt);


    const encMessage = await oEnvelopedData.Encrypt(CAPICOM_ENCODING_TYPE.CAPICOM_ENCODE_BASE64);
    if ("" === encMessage) {
        alert("oEnvelopedData.Encrypt failed");
    }

    // Проверяем, что полученное расшифрованное сообщение соответствует исходному
    const oEnvelopedData2 = await plugin.CreateObjectAsync("CAdESCOM.CPEnvelopedData");
    await oEnvelopedData2.Decrypt(encMessage);
    const content = await oEnvelopedData2.Content;
    if (expectedContent !== content) {
        alert("oEnvelopedData.Decrypt failed");
    }
})();