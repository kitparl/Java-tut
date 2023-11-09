import os
import json
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization
import requests

# Step 1: Generate a random salt
salt_size = 16
salt = os.urandom(salt_size).hex()
print(salt)

# Step 2: Generate an AES key
passphrase = 'sbi pure banking nothing else'
kdf = PBKDF2HMAC(
    algorithm=hashes.SHA512(),
    iterations=10000,
    salt=salt.encode(),
    length=16,
)
key = base64.urlsafe_b64encode(kdf.derive(passphrase.encode()))

# Step 3: Encrypt the payload using AES
IV = bytes.fromhex('F27D5C9927726BCEFE7510B1BDD3D137')
plaintext = json.dumps({
    "corporateID": "682500",
    "salt": "eu4dUZrivPjMkJsvV1WP",
    "corpSecParams": "6604062efce4072e24b22de0cc848bb498112a5535627ca72d6ffe82cbd24837d573d7c81c505a128882747b323408d1ba84860787988e8e43dba441ecec267b",
    "aPIReqRefNo": "YBAPIREQ181020231427132249"
})
plaintext_bytes = plaintext.encode('utf-8')

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding

backend = default_backend()
cipher = Cipher(algorithms.AES(key), modes.CFB(IV), backend=backend)
encryptor = cipher.encryptor()

padder = padding.PKCS7(128).padder()
padded_data = padder.update(plaintext_bytes) + padder.finalize()

ciphertext = encryptor.update(padded_data) + encryptor.finalize()

# Step 4: Base64 encode the encrypted payload
base64_encoded_payload = base64.b64encode(ciphertext).decode('utf-8')

# Step 5: Convert salt to hexadecimal
salt_hex = salt.encode().hex()

# Step 6: Read the RSA public key from a text file
with open('cert.cer', 'rb') as cert_file:
    certificate_data = cert_file.read()

# Step 7: Encrypt salt with RSA public key
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

# Load the RSA public key from the certificate
certificate = serialization.load_pem_x509_certificate(certificate_data)
public_key = certificate.public_key()

# Encrypt the salt using RSA
salt_bytes = bytes.fromhex(salt_hex)
encrypted_salt = public_key.encrypt(
    salt_bytes,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA1()),
        algorithm=hashes.SHA1(),
        label=None,
    )
)

# Step 8: Base64 encode the encrypted salt
base64_encoded_salt = base64.b64encode(encrypted_salt).decode('utf-8')

# Step 9: Set the encoded key in the HTTP header
headers = {
    'key': base64_encoded_salt,
    # Add other headers like client ID, client secret, and OAuth token here
}

# Step 10: Authenticate using OAuth token
# Implement OAuth authentication as needed

# Step 11: Hash the encrypted text payload using SHA-512
import hashlib

hashed_payload = hashlib.sha512(ciphertext).hexdigest()

authentication_payload = {
    'payload': base64_encoded_payload,
    'hashValue': hashed_payload,
}

# Example of sending a request using the requests library
url = 'https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService'
response = requests.post(url, json=authentication_payload, headers=headers)

print('Response:', response.text)
