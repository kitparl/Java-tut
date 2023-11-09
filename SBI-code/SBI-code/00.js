import * as mCrypto from 'crypto';
import forge from 'node-forge';
import axios from 'axios';
import fs from 'fs';

function encryptAandDecrypt() {

    let message = '1234567890ababab';
    let publickey = mCrypto.createPublicKey (fs.readFileSync('cert.cer', 'utf8'));
    let binaryData = Buffer. from(JSON.stringify(message));
// Encrypt the binaryData to RSA/ECB/PKCS1Padding format
    var encryptedMessage = mCrypto.({ key: publickey, padding: mCrypto.constants.RSA_PKCS1_PADDING }, binaryData).toString('base64');
    console.log(encryptedMessage);

}
encryptAandDecrypt();

