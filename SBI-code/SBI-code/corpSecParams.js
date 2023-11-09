import * as crypto from 'crypto';

// Custom function to generate a random alphanumeric string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// Step 1: Generate Hash using SHA 512 algorithm of (PAN#TIN#GSTIN#CorporateID)
const PAN = 'AAAAA6154J';
const TIN = '6154asdf';
const GSTIN = '154asd';
const CorporateID = '682500';

const combinedString = `${PAN}#${TIN}#${GSTIN}#${CorporateID}`;
const hashStep1 = crypto.createHash('sha512').update(combinedString).digest('hex');

// Step 2: Generate random ALPHANUMERIC string of 20 characters
const randomString = generateRandomString(20);
console.log('[ randomString ] >', randomString)

// Step 3: Generate HASH of (Hash generated in step 1 + alphanumeric string generated in step 2)
const combinedHash = hashStep1 + randomString;
const finalHash = crypto.createHash('sha512').update(combinedHash).digest('hex');

console.log('Step 1 Hash:', hashStep1);
console.log('Step 2 Random String:', randomString);
console.log('Step 3 Final Hash:', finalHash);

// Now you can send 'finalHash' as CorpSecParams and 'randomString' as SALT in your request.
