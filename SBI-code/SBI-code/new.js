import * as crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';
import forge from 'node-forge';


// Step 1: Generate a 16-character hexadecimal string
// const salt = crypto.randomBytes(8).toString('hex');
// console.log('[ salt ] >', salt)

// const crypto = require('crypto');

function getRandomHexString(saltSize) {
  const randomBytes = crypto.randomBytes(Math.ceil(saltSize / 2));
  const hexString = randomBytes.toString('hex');
  return hexString.slice(0, saltSize);
}

// Example usage:
const saltSize = 16; // Change this to your desired salt size
const salt = getRandomHexString(saltSize);
console.log(1,  salt);


// Step 2: Generate an AES key with a 128-bit key size
const passphrase = 'sbi pure banking nothing else'; // Secret word
const key = generateKey(salt, passphrase);

function generateKey(salt, passphrase) {
  const key = crypto.pbkdf2Sync(passphrase, salt, 10000, 16, 'sha512');
  return key;
}

// Step 3: Encrypt the payload using AES algorithm and IV
const IV = Buffer.from('F27D5C9927726BCEFE7510B1BDD3D137', 'hex');
const plaintext = JSON.stringify({
    "corporateID": "682500",
    "salt": "eu4dUZrivPjMkJsvV1WP",
    "corpSecParams": "6604062efce4072e24b22de0cc848bb498112a5535627ca72d6ffe82cbd24837d573d7c81c505a128882747b323408d1ba84860787988e8e43dba441ecec267b",
    "aPIReqRefNo": "YBAPIREQ181020231427132249"
  }); 
  
  // Replace with your payload
const encryptedPayload = encryptUsingAES(key, IV, plaintext);

// function encryptUsingAES(key, IV, plaintext) {
//   const cipher = crypto.createCipheriv('aes-128-cbc', key, IV);
//   let encrypted = cipher.update(plaintext, 'utf8', 'base64');
//   encrypted += cipher.final('base64');
//   return encrypted;
// }
function encryptUsingAES(key, IV, plaintext) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, IV);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

//////////////////888888888888888888888888888888


/////////////////////88888888888888888888888888


// Step 4: Base64 encode the encrypted payload
const base64EncodedPayload = Buffer.from(encryptedPayload, 'base64').toString('base64');
// console.log('[ base64EncodedPayload ] >', base64EncodedPayload)
// Step 5: Convert salt to hexadecimal
const saltHex = Buffer.from(salt, 'hex').toString('hex');

// console.log('[ saltHex ] >', saltHex)

// Step 6: Read the RSA public key from a text file
var certificateData = fs.readFileSync('cert.cer', 'utf8');
// console.log('[ certificateData ] >', certificateData)
var certificate = forge.pki.certificateFromPem(certificateData);
// console.log('[ certificate ] >', certificate)

// Step 7: Encrypt salt with RSA public key

//////////////////////////////////////////////////////////////////////////////////////////

// const encryptedSalt = encryptWithRSA(publicKey, saltHex);

// console.log('[ encryptedSalt ] >', encryptedSalt)

// function encryptWithRSA(publicKey, data) {
//   const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data, 'hex'));
  
//   return encryptedData.toString('base64');
// }

// console.log('[ encryptedSalt ] >', encryptedSalt)
////////////////////////////////////////////////////////////////////////////////////////////////

// Encrypt the plaintext using the RSA public key


// Get the public key from the certificate
var publicKey = certificate.publicKey;

// console.log('[ publicKey ] >', publicKey)



// Prepare the data you want to encrypt (bytes variable)

var bytes = forge.util.hexToBytes(saltHex);

// console.log('[ bytes ] >', bytes)

// Encrypt the data using RSA-OAEP with specific parameters
// var encryptedData = publicKey.encrypt(bytes, 'RSA-OAEP', {
//   md: forge.md.sha256.create(),
//   mgf1: {
//     md: forge.md.sha1.create()
//   }
// });


  let message = saltHex;
  let publickey = crypto.createPublicKey (fs.readFileSync('cert.cer', 'utf8'));
  let binaryData = Buffer. from(JSON.stringify(message));
// Encrypt the binaryData to RSA/ECB/PKCS1Padding format
  var encryptedRSAKey = crypto.publicEncrypt({ key: publickey, padding: crypto.constants.RSA_PKCS1_PADDING }, binaryData).toString('base64');
  console.log(encryptedRSAKey);


// var base64Data = Buffer.from(encryptedData, 'binary').toString('base64');
// console.log('[ base64Data ] >', base64Data)


/////////////////////////////////////////0000000000000000000000000000000000
// Encode the encrypted data in Base64



// Step 8: Base64 encode the encrypted salt
// const base64EncodedSalt = Buffer.from(encryptedSalt).toString('base64');
// console.log('[ base64EncodedSalt ] >', base64EncodedSalt)


// Step 9: Set the encoded key in the HTTP header
// const headers = {
//   key: encryptedRSAKey,
//   // Add other headers like client ID, client secret, and OAuth token here
// };


// Step 10: Authenticate using OAuth token

// Step 11: Hash the encrypted text payload using SHA-512
const hashedPayload = crypto.createHash('sha512').update(encryptedPayload).digest('hex');
// console.log('[ hashedPayload ] >', hashedPayload)

const authenticationPayload = 
  {
    payload: base64EncodedPayload,
    hashValue: hashedPayload,
  }

  // console.log('[ authenticationPayload ] >', authenticationPayload)

// Example of sending a request using Axios
// axios.post('https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService', authenticationPayload, {
  
//   headers: {
//     'key': base64Data,
//     'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
//     'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
//   },
// })
// .then((response) => {
//   console.log('Response:', response.data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

