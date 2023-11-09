import os
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend
import base64
from cryptography import x509

def generate_rsa_key(public_cert_path, key):
    # Load the public key from the certificate file
    with open(public_cert_path, "rb") as public_cert_file:
        public_cert_data = public_cert_file.read()
        public_key = x509.load_pem_x509_certificate(public_cert_data, default_backend()).public_key()

    algorithm = "AES"
    crypto_provider = "SunJCE"
    crypto_padding = "PKCS5Padding"  # Use the appropriate padding for your use case
    crypto_mode = "ENCRYPT_MODE"  # Replace with the correct mode

    try:
        encoded_key = encrypt_and_encode(key, public_key, algorithm, crypto_provider, crypto_padding, crypto_mode)
        return encoded_key
    except Exception as e:
        return None

def encrypt_and_encode(key, public_key, algorithm, crypto_provider, crypto_padding, crypto_mode):
    key_bytes = key.encode()

    if crypto_padding == "PKCS5Padding":
        cipher_text = encrypt_aes(key_bytes, public_key, algorithm, crypto_provider, crypto_mode)
    # else:
    #     cipher_text = encrypt_rsa(key_bytes, public_key)

    encoded_text = base64.b64encode(cipher_text).decode("utf-8")
    return encoded_text

def encrypt_aes(key, public_key, algorithm, crypto_provider, crypto_mode):
    # Implement AES encryption using the public key (not recommended, but shown for comparison)
    # You should use AES encryption with a shared key, not the public key
    # Here we use the RSA public key for demonstration purposes only
    cipher = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    encrypted_data = public_key.encrypt(
        key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return encrypted_data

def encrypt_rsa(key, public_key):
    # Encrypt data using RSA public key
    encrypted_data = public_key.encrypt(
        key,
        padding.PKCS1v15()
    )
    return encrypted_data

salt_size = 16
salt = os.urandom(salt_size).hex()
print("Salt:", salt)

# Usage
public_cert_path = "./cert.cer"
key = salt
result = generate_rsa_key(public_cert_path, key)
if result:
    print("Encoded Key:", result)
else:
    print("Encryption failed")
