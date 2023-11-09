import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa
import base64
from cryptography import x509
from cryptography.hazmat.primitives import hashes

def generate_rsa_key(public_key_path, key):
    with open(public_key_path, "rb") as public_cert_file:
        public_cert_data = public_cert_file.read()
        public_key = x509.load_pem_x509_certificate(public_cert_data, default_backend()).public_key()
    
    # with open(public_key_path, "rb") as public_key_file:
    #     public_key = serialization.load_pem_public_key(public_key_file.read(), backend=default_backend())

        

    try:
        encoded_key = encrypt_and_encode(key, public_key)
        return encoded_key
    except Exception as e:
        return None

def encrypt_and_encode(key, public_key):
    key_bytes = key.encode()

    cipher_text = encrypt_rsa(key_bytes, public_key)

    encoded_text = base64.b64encode(cipher_text).decode("utf-8")
    return encoded_text

def encrypt_rsa(key, public_key):
    cipher_text = public_key.encrypt(
        key,
        padding.PKCS1v15()
    )
    return cipher_text

salt_size = 8
salt = os.urandom(salt_size).hex()
print("Salt:", salt)

# Usage
public_key_path = "cert.cer"
key = salt
result = generate_rsa_key(public_key_path, key)
if result:
    print("Encoded Key:", result)
else:
    print("Encryption failed")
