import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';

// Step 1: Generate 16-character hexadecimal string
const hexString = crypto.randomBytes(8).toString('hex'); // 16 characters (8 bytes)

console.log('[ 1 hexString ] >', hexString);

// Step 2: RSA encrypt the string using the provided public certificate
const publicKey = fs.readFileSync('cert.cer'); // Load the public certificate

// Encrypt with RSA using RSA/ECB/PKCS1Padding (PKCS1 padding is the default)
const encryptedHex = crypto.publicEncrypt({
  key: publicKey,
  padding: crypto.constants.RSA_PKCS1_PADDING // Use PKCS1 padding
}, Buffer.from(hexString, 'hex'));

console.log('[ encryptedHex ] >', encryptedHex);

// Step 3: Set the "key" parameter in the header
const headers = {
    'key': encryptedHex,
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19'
  };
  
  console.log('[ 2 headers ] >', headers)
  
  
  // Step 4: Convert hexadecimal string to plain text
  // const plainText = Buffer.from(hexString, 'hex').toString('utf8');
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
  
  const salt = 'OimtrE58QNLIfbD9'; // Use the provided salt
  const passphrase = 'sbi pure banking nothing else';
  const aesKey = generateKey(salt, passphrase);
  console.log('[ 3 aesKey ] >', aesKey)
  
  // Step 6: Encrypt the payload using AES algorithm and IV
  const iv = Buffer.from('F27D5C9927726BCEFE7510B1BDD3D137', 'hex');
  const cipher = crypto.createCipheriv('aes-128-cbc', aesKey, iv);
  const encryptedPayload = Buffer.concat([cipher.update(plaintextPayload, 'utf8'), cipher.final()]);
  
  console.log('[ 4 encryptedPayload ] >', encryptedPayload)
  
  // Step 7: Base64 encode the encrypted payload and set it as "payload" in the request
  const base64EncryptedPayload = encryptedPayload.toString('base64');
  
  console.log('[ 5 base64EncryptedPayload ] >', base64EncryptedPayload)
  
  // Step 8: Add client id, client secret, and OAuth token to the header
  
  // // Assuming you have OAuth token and credentials
  // const clientId = 'your_client_id';
  // const clientSecret = 'your_client_secret';
  // const oauthToken = 'your_oauth_token';
  
  // headers['Client-Id'] = clientId;
  // headers['Client-Secret'] = clientSecret;
  // headers['Authorization'] = `Bearer ${oauthToken}`;
  
  // Step 9: Calculate SHA-512 hash of the base64 encoded encrypted payload as digital signature
  // const digitalSignature = crypto.createHash('sha512').update(base64EncryptedPayload, 'base64').digest('hex');
  //   // Generate SHA-512 hash of the encrypted payload
  
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