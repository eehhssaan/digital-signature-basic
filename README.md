# digital-signature-basic
To be able to work with this project, you need to have digital certificate and private/public keys (both .pem)

Install OpenSSL:
For Linux: OpenSSL is typically pre-installed. If not, use your package manager to install OpenSSL.
For macOS: OpenSSL is pre-installed. You can access it through the terminal.
For Windows: Download OpenSSL from the official website (https://www.openssl.org/) and install it.

Generate a Private Key and Certificate:
1) Open your terminal or command prompt.
2) Run the following command to generate a private key:
    openssl genpkey -algorithm RSA -out private_key.pem
3) Run the following command to generate a self-signed certificate:
    openssl req -new -x509 -key private_key.pem -out certificate.pem -days 365
4) Move the files to the project folder/directory
5) Remember to update files names (if needed)
