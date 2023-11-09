// import nodeRSA from 'node-rsa'
// import axios from 'axios';
// import fs from 'fs';
// import forge from 'node-forge'

// function generatePublicKey(certPath) {
//     const certData = fs.readFileSync(certPath, 'utf8');
//     const cert = forge.pki.certificateFromPem(certData);
//     const pubkey = cert.publicKey;
//     return pubkey;
// }

// function generateRSAKey(key) {
//     let cryptoKey = null;

//     try {
//         const publicKey = generatePublicKey('./cert.cer');
//         const cryptoConfig = {
//             algorithm: 'aes-256-ecb',
//             // cryptoProvider: appConfig.getEncryptionProvider(),
//             // cryptoMode: 'encrypt',
//             cryptoKey: key,
//             // cryptoPadding: appConfig.getEncryptionPadding(),
//             publicKey: publicKey
//         };

//         cryptoKey = encryptAndEncode(cryptoConfig);
//         console.log('[ cryptoKey ] >', cryptoKey)
//     } catch (e) {
//         console.log('[ e ] >', e)
//         return cryptoKey;
//     }
// }

// function encryptAndEncode(cryptoConfig) {
//     const publicKey = cryptoConfig.publicKey;
//     const key = cryptoConfig.cryptoKey;
//     const algorithm = cryptoConfig.algorithm;
//     const cryptoProvider = cryptoConfig.cryptoProvider;
//     const cryptoMode = cryptoConfig.cryptoMode;
//     const cryptoPadding = cryptoConfig.cryptoPadding;

//     try {
//         const bufferKey = Buffer.from(key, 'utf8');
//         const cipher = crypto.createCipheriv(algorithm, bufferKey, Buffer.alloc(16, 0));
//         cipher.setPublicKey(publicKey);

//         let encrypted = cipher.update(data, 'utf8', 'base64');
//         encrypted += cipher.final('base64');

//         return encrypted;
//     } catch (e) {
//         return null;
//     }
// }

// generateRSAKey("adfafg2323");



import axios from 'axios';
import fs from 'fs';
import { connect } from 'http2';
import forge from 'node-forge';

function generatePublicKey(certPath) {
    const certData = fs.readFileSync(certPath, 'utf8');
    const cert = forge.pki.certificateFromPem(certData);
    const pubkey = cert.publicKey;
    return pubkey;
}


let a = generatePublicKey('./cert.cer')
console.log('[ a ] >', a)

function generateRSAKey(key, data) {
    let cryptoKey = null;

    try {
        const publicKey = generatePublicKey('./cert.cer');
        const cryptoConfig = {
            algorithm: 'aes-256-ecb',
            publicKey: publicKey
        };

        console.log('[ cryptoConfig ] >', cryptoConfig)

        cryptoKey = encryptAndEncode(cryptoConfig, data);


        // console.log('[ cryptoKey ] >', cryptoKey);


    } catch (e) {
        console.log('[ e ] >', e);
    }

    return cryptoKey;
}

// function encryptAndEncode(cryptoConfig, data) {
//     const publicKey = cryptoConfig.publicKey;
//     const algorithm = cryptoConfig.algorithm;

//     try {
//         const cipher = forge.pki.rsa.PublicKey.encrypt(data, publicKey, 'RSA-OAEP', {
//             md: forge.md.sha256.create()
//         });

//         console.log('[ cipher ] >', cipher)

//         return forge.util.encode64(cipher);
//     } catch (e) {
//         return null;
//     }
// }

function encryptAndEncode(cryptoConfig, data) {
    const publicKey = cryptoConfig.publicKey;
    const algorithm = cryptoConfig.algorithm;

    try {
        // Note: Using ECB mode for encryption is not recommended for security reasons.
        const cipher = forge.util.encode64(publicKey.encrypt(forge.util.decodeUtf8(data)));
        console.log('[ cipher ] >', cipher)

        return cipher;
    } catch (e) {
        return null;
    }
}

generateRSAKey(null, "adfafg2323")