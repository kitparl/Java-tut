import * as crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';
import forge from 'node-forge';

// Provided payload
const payloadData = JSON.stringify({
  "corporateID": "682500",
  "salt": "eu4dUZrivPjMkJsvV1WP",
  "corpSecParams": "6604062efce4072e24b22de0cc848bb498112a5535627ca72d6ffe82cbd24837d573d7c81c505a128882747b323408d1ba84860787988e8e43dba441ecec267b",
  "aPIReqRefNo": "YBAPIREQ031020231427132249"
});

// Step 1: Generate 16-character hexadecimal string
const hexString = crypto.randomBytes(8).toString('hex');

// Step 2: Extract the public key from the certificate file
const certificatePath = 'cert.cer'; // Replace with the path to your certificate file
const certificateData = fs.readFileSync(certificatePath, 'utf8');
const publicKey = certificateData.toString();

// Step 3: RSA encrypt the hexadecimal string using the extracted public key
const encryptedHexString = crypto.publicEncrypt({
  key: publicKey,
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256',
}, Buffer.from(hexString, 'hex'));

// Step 4: Base64 encoding of the RSA encrypted string
const base64Encoded = encryptedHexString.toString('base64');
console.log('[ base64Encoded ] >', base64Encoded)

// Step 5: Convert hexadecimal string to plain text
const plainText = Buffer.from(hexString, 'hex').toString('utf8');

// Step 6: Generate a 128-bit AES key
const secretWord = 'sbi pure banking nothing else';
const aesKey = crypto.pbkdf2Sync(plainText, secretWord, 100000, 16, 'sha256');

// Step 7: Encrypt the payload using AES
const iv = Buffer.from('F27D5C9927726BCEFE7510B1BDD3D137', 'hex');
const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, iv);
let encryptedPayload = cipher.update(payloadData, 'utf8', 'base64');
encryptedPayload += cipher.final('base64');

// Step 8: Base64 encoding of the AES encrypted payload
const finalPayload = Buffer.from(encryptedPayload, 'binary').toString('base64');

console.log('[ finalPayload ] >', finalPayload)


// Step 9: Calculate SHA-512 hash of the encrypted payload
const hash = crypto.createHash('sha512');
const hashedRequestValue = hash.update(finalPayload).digest('hex');
console.log('[ hashedRequestValue ] >', hashedRequestValue)

// You can now send finalPayload as the "payload" parameter in your request headers and base64Encoded as the "key" parameter.

const authenticationPayload = 
  // {
  //   payload: finalPayload,
  //   uniqueMessageId: Date.now().toString(),
  //   hashValue: hashedRequestValue,
  // }
  {
    payload: 'Yfc3O/Ky43mgMUtbVQ1k/JVPm/j4GgDT2tmEeZqu6uUGST+Fya1UoMtXMhfwY0+aNRy4ZU6ev15zSWjrLjrL8Px2vlM+b2GwwlNYtswTmT0nrmsQNbXrRmy5Bf2Mftuj1nRIjzFdzGYXmI+dqutTH/9itUpFCpEbXsZZ2ebaxkhhodEDXXZAtgFxvCS35jXCKUiw2j9FV6sVyYklx3y2oOe8cdPT9+g2y5CZOaj1xtvYeylUrUa7QyDtjOGIktOKVldE9U+LIsn2KL/M9JTBMlOFZnRuzs8cII1GXVmJQroecIo9/d8aht2zpfRlZBDMQeoBGBhEqwOjN7BYcRMWqQ==',
    uniqueMessageId: '1696334193553',
    hashValue: '1ce56f3788245b97424a77c0c14faf54ecc509ce19b8273e3160f9cb1e76b97f4a751d59c4c7feee5a8845b68c6d1bfa7e0242c8f9935dc0f00a3140ad7ab58c'
  }

// Example of sending a request using Axios
axios.post('https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService', authenticationPayload, {
  
  headers: {
    // 'key': base64Encoded,
    'key': "bnrWpStpp7HdQ4FjSGodK1ziHZkbi7NlwivMLjcLOVM0zBLkm4wMbHbElj0J8I+7qGCqxGSqbxar4b9WMBorKNJ5YVg0+BrFVXqhpPtT5dRx6yvhUwpZN04me0nnXG8cKoNDCuEu5oGnP4zN9WTcuIEr9DJzuQgFkE6123X3Kho8zne37B6lwAjl/1vAVoKB1ZoGSt6Lrq5wO+Rerjgr+XDJL0gNmcqLJajDO/Qe1vTWRNo1s9tSnZTlFgCKpp92w6sbc2r1uxMPe6FuDwiU2PEV0O7d3qH7gX6ZNBqcbxO+YE1M9tNP/4fAqpDC0IXL/E1/Wgxexz/DsJ8zfHn5Uw==",
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
  },
})
.then((response) => {
  console.log('Response:', response.data);
})
.catch((error) => {
  console.error('Error:', error);
});

