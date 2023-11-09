from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes, padding
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import serialization
from base64 import b64encode, b64decode
import binascii

def encrypt_using_salt(salt, plaintext):
    key = generate_key(salt, "sbi pure banking nothing else")

    cipher = Cipher(algorithms.AES(key), modes.CBC(hex_to_bytes("F27D5C9927726BCEFE7510B1BDD3D137"), backend=default_backend()))
    encryptor = cipher.encryptor()

    padded_data = pad_data(plaintext)
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()

    return bytes_to_base64(ciphertext)

def generate_key(salt, passphrase):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA1(),
        length=16, # 128 bits
        salt=hex_to_bytes(salt),
        iterations=10000,
        backend=default_backend()
    )

    key = kdf.derive(passphrase.encode('utf-8'))
    return key

def do_final(encrypt_mode, key, iv, data):
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv, backend=default_backend()))

    if encrypt_mode == 1:
        encryptor = cipher.encryptor()
    else:
        encryptor = cipher.decryptor()

    decrypted_data = encryptor.update(data) + encryptor.finalize()

    return decrypted_data

def hex_to_bytes(hex_string):
    return binascii.unhexlify(hex_string)

def bytes_to_base64(data):
    return b64encode(data).decode('utf-8')

def pad_data(data):
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data.encode('utf-8')) + padder.finalize()
    return padded_data

# Example usage:
salt = "abcdef1234567890"
plaintext = "Hello, encryption!"

encrypted_text = encrypt_using_salt(salt, plaintext)
print("Encrypted Text:", encrypted_text)
