import hashlib
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode
from binascii import hexlify, unhexlify

def encrypt_using_salt(salt, plaintext):
    key = generate_key(salt, "sbi pure banking nothing else")
    iv = "F27D5C9927726BCEFE7510B1BDD3D137"
    cipher_text = do_final(1, key, iv, plaintext.encode("utf-8"))
    return b64encode(cipher_text).decode("utf-8")

def generate_key(salt, passphrase):
    key_derivation_iterations = 10000
    key_size_bytes = 16  # 128 bits
    key = PBKDF2(passphrase, unhexlify(salt), dkLen=key_size_bytes, count=key_derivation_iterations, prf=None)
    return key

def do_final(encrypt_mode, key, iv, data):
    cipher = AES.new(key, AES.MODE_CBC, unhexlify(iv))
    if encrypt_mode == 1:  # Encrypt mode
        cipher_text = cipher.encrypt(pad(data, AES.block_size))
    else:  # Decrypt mode
        cipher_text = unpad(cipher.decrypt(data), AES.block_size)
    return cipher_text

# Utility function to convert hex string to bytes
def hex_to_bytes(s):
    return unhexlify(s)

def hash_text(text):
    sha512 = hashlib.sha512()
    sha512.update(text.encode("utf-8"))
    return sha512.hexdigest()

# Example usage:
salt = "733b015d877ed95a"
# plaintext = ''
plaintext = '{"corporateID": "682500", "salt": "eu4dUZrivPjMkJsvV1WP", "corpSecParams": "6604062efce4072e24b22de0cc848bb498112a5535627ca72d6ffe82cbd24837d573d7c81c505a128882747b323408d1ba84860787988e8e43dba441ecec267b", "aPIReqRefNo": "YBAPIREQ091120231427132249"}'
encrypted_text = encrypt_using_salt(salt, plaintext)
print("Encrypted text:", encrypted_text)

# Hash the encrypted text using SHA-512
hashed_request_value = hash_text(encrypted_text)
print("Hashed request value:", hashed_request_value)






import requests

url = 'https://uatapibanking.yonobusiness.sbi/erpuat/uat/corp/cinb/authenticationService'
authentication_payload = {
       'payload': encrypted_text,
    'hashValue': hashed_request_value,
}

headers = {
    'key': 'g0pgJTo7yMPGFbuYoGwGnFYCwdOBf4Tjp3AKWxi35elzph4ZVwCd6swqQHY7sjjZGv2/SABvpjo5EJK2J0ts7Zd5Mv5FladhvpB/gkQPL6tC1CQl2OSjCOwm4EW15KPDYccb9mD5AMveAVJ+PHstSao/pjwyWC+UMKiennUozmQidTDtqiL4RAKqrDFeT/cTC6ybPUykcyK0q7egezWTerY0TBK9KLHefSUXb9h9Grnbbsgk1oh25ypYzgMXpSGxG5BKGqE3/XEBIJ4vsSsM5BMqbny7Jo2OIKXGOeTrvnWqBhexXRzJdC7Hn7W5ltd3jxzfc0XTaWD+YCuSd3o8mQ==',
    'X-IBM-Client-Id': '666116d7e2414a2b2eb9e93b0c7df4c6',
    'X-IBM-Client-Secret': '6828b1b01e0ad1c58863f913ca0aaf19',
}

try:
    response = requests.post(url, json=authentication_payload, headers=headers)
    response.raise_for_status()  # Check for HTTP errors
    print('Response:', response.json())
except requests.exceptions.RequestException as err:
    print('Error:', err)

