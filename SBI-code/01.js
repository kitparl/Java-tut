import * as crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';

// Step 1: Generate 16-character hexadecimal string
const hexString = crypto.randomBytes(8).toString('hex'); // 16 characters (8 bytes)

console.log('[ 1 hexString ] >', hexString)

// Step 2: RSA encrypt the string using the provided public certificate
const publicKey = fs.readFileSync('cert.cer'); // Load the public certificate
const encryptedHex = crypto.publicEncrypt(publicKey, Buffer.from(hexString, 'hex')).toString('base64');

console.log('[ **1.1 encryptedHex ] >', encryptedHex)
// Step 3: Set the "key" parameter in the header
const headers = {
  'key': encryptedHex,
  'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
  'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19'
};

console.log('[ 2 headers ] >', headers)


// Step 4: Convert hexadecimal string to plain text
// Provided plaintext payload
const plaintextPayload = JSON.stringify({
  "corporateID": "682500",
  "salt": "eu4dUZrivPjMkJsvV1WP",
  "corpSecParams": "6604062efce4072e24b22de0cc848bb498112a5535627ca72d6ffe82cbd24837d573d7c81c505a128882747b323408d1ba84860787988e8e43dba441ecec267b",
  "aPIReqRefNo": "YBAPIREQ031020231427132249"
});


// Step 5: Generate AES key with a 128-bit key size
function generateKey(salt, passphrase) {
  return crypto.pbkdf2Sync(passphrase, Buffer.from(salt, 'hex').toString('utf8'), 10000, 16, 'sha1');
}

const salt = 'a675a5eb0943aa43'; // Use the provided salt
const passphrase = 'sbi pure banking nothing else';
const aesKey = generateKey(salt, passphrase);
console.log('[ 3 aesKey ] >', aesKey)

// Step 6: Encrypt the payload using AES algorithm and IV
const iv = Buffer.from('F27D5C9927726BCEFE7510B1BDD3D137', 'hex');
const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, iv);
const encryptedPayload = Buffer.concat([cipher.update(plaintextPayload, 'utf8'), cipher.final()]);

console.log('[ 4 encryptedPayload ] >', encryptedPayload)

// Step 7: Base64 encode the encrypted payload and set it as "payload" in the request
let base64EncryptedPayload = encryptedPayload.toString('base64');
base64EncryptedPayload = 'Qb05JFNx38Q35v2qs/KX6W0IDEtJTVphBdqzr1WAjh9zhOzU/63XcxsJdChNK6lSxI3KU3sa1dpXKaIuX8Qsgm6S5EkytljtjNlcJrA3OhKNB3UuoPAhMzU/zfSNa60MjQvytY79ciWs6WbwGaoQHwHHGYJN53RsSQefcStT+PXPKNyUIYwwt0Za3hnLP8gF/F4TdOgxoMDYMRuHZKr+vqTDnpbeM9S9cVd2plJk5wKJCalj7ttXslgR8OWz4gFsNhOJKX9990+oG459xJVB6QRGzYFTg4ZesmU9mt8GJiaIpYCfsJsQFa5zhkzm6wgwToUikzbL4NYhydY1bQ5mEmwxcY4md3RF+fi22Ed9JEY=';

console.log('[ 5 base64EncryptedPayload ] >', base64EncryptedPayload)


function shaHashing(data, shaAlgorithm) {
  const hash = crypto.createHash(shaAlgorithm);
  hash.update(data);
  return hash.digest('hex');
}
const shaAlgorithm = 'sha512';

  const digitalSignature = shaHashing(base64EncryptedPayload, shaAlgorithm);
  console.log('digitalSignature', digitalSignature);



// Add the digital signature to the request payload
const authenticationPayload = 
{
  payload: base64EncryptedPayload,
  uniqueMessageId: Date.now().toString(),
  hashValue: digitalSignature,
};

console.log('[ 7 authenticationPayload ] >', authenticationPayload)


  // Make the HTTP request with the encrypted payload and headers
  axios.post(`https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService`,  authenticationPayload , { headers })
    .then(response => {
      // console.log('Response:', response);

      console.log('Response:', response.data);
      // console.log(response)

    })
    .catch(error => {
      console.error('Error:', error);
    });