import axios from 'axios';
import fs from 'fs';
import forge from 'node-forge';
import * as crypto from 'crypto';

// Provided plaintext payload
const data = 'Yfc3O/Ky43mgMUtbVQ1k/JVPm/j4GgDT2tmEeZqu6uUGST+Fya1UoMtXMhfwY0+aNRy4ZU6ev15zSWjrLjrL8Px2vlM+b2GwwlNYtswTmT0nrmsQNbXrRmy5Bf2Mftuj1nRIjzFdzGYXmI+dqutTH/9itUpFCpEbXsZZ2ebaxkhhodEDXXZAtgFxvCS35jXCKUiw2j9FV6sVyYklx3y2oOe8cdPT9+g2y5CZOaj1xtvYeylUrUa7QyDtjOGIktOKVldE9U+LIsn2KL/M9JTBMlOFZnRuzs8cII1GXVmJQroecIo9/d8aht2zpfRlZBDMQeoBGBhEqwOjN7BYcRMWqQ==';

function shaHashing(data, shaAlgorithm) {
  const hash = crypto.createHash(shaAlgorithm);
  hash.update(data);
  return hash.digest('hex');
}

const shaAlgorithm = 'sha512';

try {
  const hashedData = shaHashing(data, shaAlgorithm);
  console.log(hashedData);
} catch (error) {
  console.error(error);
}
