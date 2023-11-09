import * as crypto from 'crypto';
import forge from 'node-forge';
import axios from 'axios';
import fs from 'fs';

function wrapKey(keyToWrap, wrappingKey) {
  const cipher = crypto.createCipheriv('aes-256-ecb', wrappingKey, '');
  return Buffer.concat([cipher.update(keyToWrap), cipher.final()]);
}

function encryptAndSendPayload() {
  // Replace with your actual payload, client ID, and secret key
  const payload = JSON.stringify({
    corporateID: "682500",
    salt: "oLSGIkHQ8YXK4EolW1Ju",
    corpSecParams: 'c888eb7e5a01a27827990f9672e381af042c3232d626bbb2b3037b4f2c19fcc759cf3083c5a693ecd9ff40a5a614ccbb193b57cc43db740e99df5d0db31be4d4',
    aPIReqRefNo: "YBAPIREQ110920231432051234",
  });

  // Generate a random 128-bit AES key
  const aesKey = crypto.randomBytes(16);

  // Encrypt the payload using AES128
  const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, crypto.randomBytes(16));
  let encryptedPayload = cipher.update(payload, 'utf8', 'base64');
  encryptedPayload += cipher.final('base64');

  // Read YONOB's RSA certificate (not just the public key) from a txt file (replace with your file path)
  const certificatePem = fs.readFileSync('./uatapibankingYonobusinessSBI.txt', 'utf8');

  // Parse the certificate
  const certificate = forge.pki.certificateFromPem(certificatePem);

  // Extract the public key from the certificate
  const rsaPublicKey = certificate.publicKey;

  // Generate SHA-512 hash of the encrypted payload
  const hash = crypto.createHash('sha512');
  hash.update(encryptedPayload);
  const digitalSignature = hash.digest('hex');

  // Generate a wrapping key for the AES key
  const wrappingKey = crypto.randomBytes(32); // 256-bit key

  // Wrap the AES key using the wrapping key
  const wrappedAesKey = wrapKey(aesKey, wrappingKey);

  // Encode the wrapped AES key as Base64
  const wrappedAesKeyBase64 = wrappedAesKey.toString('base64');
  console.log('[ wrappedAesKeyBase64 ] >', wrappedAesKeyBase64)

  // Create the request with the required headers
  const headers = {
    'key': wrappedAesKeyBase64,
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
  };

  // Create the authentication payload object
  const authenticationPayload = {
    payload: encryptedPayload,
    uniqueMessageId: Date.now().toString(),
    hashValue: digitalSignature,
  };

  // Make the HTTP request with the wrapped AES key and headers
  axios.post(`https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService`, authenticationPayload, { headers })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Call the function to encrypt and send the payload
encryptAndSendPayload();
