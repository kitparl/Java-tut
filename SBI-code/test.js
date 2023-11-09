import * as crypto from 'crypto';
import forge from 'node-forge';
import axios from 'axios';
import fs from 'fs';

async function encryptAndSendPayload() {
  // Replace with your actual payload, client ID, and secret key
  const payload = JSON.stringify({
    corporateID: "682500",
    salt: "oLSGIkHQ8YXK4EolW1Ju",
    corpSecParams: 'c888eb7e5a01a27827990f9672e381af042c3232d626bbb2b3037b4f2c19fcc759cf3083c5a693ecd9ff40a5a614ccbb193b57cc43db740e99df5d0db31be4d4',
    aPIReqRefNo: "YBAPIREQ110920231432051234",
  });

  // Generate a random 128-bit AES key
  const aesKey = crypto.randomBytes(16);
  console.log('[ 1 aesKey ] >', aesKey);

  // Encrypt the payload using AES128
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, iv);
  console.log('[ 2 cipher ] >', cipher);

  let encryptedPayload = cipher.update(payload, 'utf8', 'base64');
  encryptedPayload += cipher.final('base64');
  console.log('[ 3 encryptedPayload ] >', encryptedPayload);

  // Read YONOB's RSA certificate (not just the public key) from a txt file (replace with your file path)
  const certificatePem = fs.readFileSync('./uatapibankingYonobusinessSBI.txt', 'utf8');
  console.log('[ 4 certificatePem ] >', certificatePem);

  // Parse the certificate
  const certificate = forge.pki.certificateFromPem(certificatePem);
  console.log('[ 5 certificate ] >', certificate);

  // Extract the public key from the certificate
  const rsaPublicKey = certificate.publicKey;
  console.log('[ 6 rsaPublicKey ] >', rsaPublicKey);

  // Split the AES key into smaller chunks
  const chunkSize = 128 / 8; // 128 bits
  const aesKeyChunks = [];
  for (let i = 0; i < aesKey.length; i += chunkSize) {
    aesKeyChunks.push(aesKey.slice(i, i + chunkSize));
  }

  // Initialize an array to store the encrypted AES key chunks
  const encryptedAesKeyChunks = [];

  // Encrypt each chunk using RSA public key
  for (const chunk of aesKeyChunks) {
    const encryptedChunk = rsaPublicKey.encrypt(chunk, 'RSAES-PKCS1-V1_5');
    encryptedAesKeyChunks.push(encryptedChunk);
  }

  // Concatenate the encrypted AES key chunks into the final encrypted AES key as a Buffer
  const encryptedAesKey = Buffer.concat(encryptedAesKeyChunks);

  // Generate SHA-512 hash of the encrypted payload
  const hash = crypto.createHash('sha512');
  hash.update(encryptedPayload);
  console.log('[ 8 hash ] >', hash);

  const digitalSignature = hash.digest('hex');
  console.log('[ 9 digitalSignature ] >', digitalSignature);

  // Create the request with the required headers
  const headers = {
    'key': encryptedAesKey, // Pass the Buffer directly
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
  };

  // Create the authentication payload object
  const authenticationPayload = {
    payload: encryptedPayload,
    uniqueMessageId: Date.now().toString(),
    hashValue: digitalSignature,
  };
  console.log('[ 11 authenticationPayload ] >', authenticationPayload);

  try {
    // Make the HTTP request with the encrypted payload and headers
    const response = await axios.post(`https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService`, authenticationPayload, { headers });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to encrypt and send the payload
encryptAndSendPayload();