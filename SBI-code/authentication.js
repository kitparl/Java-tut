import * as crypto from 'crypto';
import forge from 'node-forge';
import axios from 'axios';
import fs from 'fs';

function encryptAndSendPayload() {
  // Replace with your actual payload, client ID, and secret key
  const payload = JSON.stringify({
"corporateID": "682500",
 "salt": "OimtrE58QNLIfbD9",
  "corpSecParams": "b139447dba66880aa1bf65f2a5fc6eb9709b174092e38340b3b43ce4d8096ad01d9d99c07f167609ce9726bd4c1d0398f7f8e9beb7f752e856e1252e14883621",
     "aPIReqRefNo": "YBAPIREQ270920231427132249"
 });

    ////////////////////////////////////////

    const encoder = new TextEncoder();
    const payloadBytes = encoder.encode(payload).length;
    console.log('Payload Length in Bytes (UTF-8):', payloadBytes);

    //////////////////////////////////////////

  // Generate a random 128-bit AES key
  const aesKey = crypto.randomBytes(16);
  console.log('[ 1 aesKey ] >', aesKey);


  // Encrypt the payload using AES128
  const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, crypto.randomBytes(16));
  console.log('[ 2 cipher ] >', cipher)

  let encryptedPayload = cipher.update(payload, 'utf8', 'base64');
  encryptedPayload += cipher.final('base64');
  console.log('[ 3 encryptedPayload ] >', encryptedPayload)
  // console.log('[ encryptedPayload.length ] >', encryptedPayload.length)


  // Read YONOB's RSA certificate (not just the public key) from a txt file (replace with your file path)
  const certificatePem = fs.readFileSync('yonobusiness_sbi.cer', 'utf8');
  // console.log('[ 4 certificatePem ] >', certificatePem)


  // Parse the certificate
  const certificate = forge.pki.certificateFromPem(certificatePem);
  // console.log('[ 5 certificate ] >', certificate )

  console.log('%c [  ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', )
  // Extract the public key from the certificate
  const rsaPublicKey = certificate.publicKey;
  // console.log('[ 6 rsaPublicKey ] >', rsaPublicKey)

  // Encrypt the AES key using RSA public key
  const encryptedAesKey = rsaPublicKey.encrypt(aesKey.toString('binary'));
  console.log('[ 7 encryptedAesKey ] >', encryptedAesKey)


  // Generate SHA-512 hash of the encrypted payload
  const hash = crypto.createHash('sha512');
  hash.update(encryptedPayload);
  console.log('[ 8 hash ] >', hash);

  const digitalSignature = hash.digest('hex');
  console.log('[ 9 digitalSignature ] >', digitalSignature)

  // Encrypt the AES key using RSA public key and encode it as Base64
const encryptedAesKeyBase64 = Buffer.from(rsaPublicKey.encrypt(aesKey.toString('binary'))).toString('base64');
console.log('[ 10 ] >', encryptedAesKeyBase64)

  // Create the request with the required headers
  const headers = {
    'key': encryptedAesKeyBase64,
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
  };

  // Create the authentication payload object
  const authenticationPayload = 
  {
    payload: encryptedPayload,
    uniqueMessageId: Date.now().toString(),
    hashValue: digitalSignature,
  };

  console.log('[ 11 authenticationPayload ] >', authenticationPayload)

  // Make the HTTP request with the encrypted payload and headers
  axios.post(`https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService`,  authenticationPayload , { headers })
    .then(response => {
      // console.log('Response:', response);

      console.log('Response:', response);
      // console.log(response)

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to encrypt and send the payload
encryptAndSendPayload();
