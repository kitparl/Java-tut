const crypto = require('crypto');

function encryptAndEncode(config) {
  const enckey = config.getCryptoKey();
  const encKeyfile = config.getCipherKeyFile();
  const algorithm = config.getAlgorithm();
  const encPadding = config.getCryptoPadding();
  const encProvider = config.getCryptoProvider();
  const cryptoMode = config.getCryptoMode();
  const plainText = config.getPlainText();
  const publicKey = config.getPublicKey();

  const keyBytes = Buffer.alloc(16);
  let b = Buffer.from('');

  if (!encKeyfile) {
    b = Buffer.from(enckey, 'utf8');
  } else {
    // Assuming you have a function getFileBytes that reads the file and returns a Buffer
    b = getFileBytes(enckeyfile);
  }

  const len = Math.min(b.length, keyBytes.length);
  b.copy(keyBytes, 0, 0, len);

  let cipherText;

  if (encPadding === 'RSA/ECB/PKCS1Padding') {
    const privateKey = {
      key: keyBytes,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    };

    cipherText = crypto.publicEncrypt(privateKey, Buffer.from(plainText, 'utf8'));
  }

  const encodedText = cipherText.toString('base64');

  return encodedText;
}
