import * as crypto from 'crypto';
import fs from 'fs';
import forge from 'node-forge';


var certificateData = fs.readFileSync('cert.cer', 'utf8');
console.log('[ certificateData ] >', certificateData)
var certificate = forge.pki.certificateFromPem(certificateData);
console.log('[ certificate ] >', certificate)

// Get the public key from the certificate
var publicKey = certificate.publicKey;

console.log('[ publicKey ] >', publicKey)

let bytes = forge.util.encodeUtf8('Hello, World!');

console.log('[ bytes ] >', bytes)

// Prepare the data you want to encrypt (bytes variable)

// Encrypt the data using RSA-OAEP with specific parameters
var encryptedData = publicKey.encrypt(bytes, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create()
  }
});

var base64Data = Buffer.from(encryptedData, 'binary').toString('base64');
console.log('[ base64Data ] >', base64Data)


// Now, encryptedData contains the encrypted bytes
// You can send this data to someone with the corresponding private key to decrypt it
