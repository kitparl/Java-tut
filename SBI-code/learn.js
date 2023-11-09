import forge from 'node-forge';

// var cipher = forge.cipher.createCipher('AES-CBC', key);

import NodeRSA from 'node-rsa'


// Generate a new RSA key pair
// const key = new NodeRSA();
const key = new NodeRSA({b: 256});


// Encrypt a message
const encryptedMessage = key.encrypt('This is a secret message');

// Decrypt the message
const decryptedMessage = key.decrypt(encryptedMessage);

// Print the decrypted message
console.log(decryptedMessage); // This is a secret message
