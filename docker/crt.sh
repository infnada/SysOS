#!/bin/bash

# https://www.npmjs.com/package/client-certificate-auth-v2
# https://engineering.circle.com/https-authorized-certs-with-node-js-315e548354a2
# https://blog.cloudboost.io/implementing-mutual-ssl-authentication-fc20ab2392b3
# https://github.com/tgies/client-certificate-auth/blob/master/lib/clientCertificateAuth.js

# DHE & ECDHE
openssl dhparam -outform PEM -out certificates/dhparam.pem 2048

# One has to generate a signing key specific to the certificate authority.
openssl req \
    -new \
    -newkey rsa:4096 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "//C=ES\ST=CA\L=Barcelona\O=anyOpsOS\OU=Services CA\CN=anyopsos.local" \
    -keyout certificates/ca/ca.key \
    -out certificates/ca/ca.cert


# Generate vault key
openssl genrsa -out certificates/vault/vault.key 4096

# Generate vault csr
openssl req -new -sha256 -key certificates/vault/vault.key -out certificates/vault/vault.csr -subj "//C=ES\ST=CA\L=Barcelona\O=anyOpsOS\OU=API Auth\CN=vault.anyopsos.local"

# Sign vault csr
openssl x509 -req -days 365 -in certificates/vault/vault.csr -CA certificates/ca/ca.cert -CAkey certificates/ca/ca.key -CAcreateserial -out certificates/vault/vault.cert


# Generate auth key
openssl genrsa -out certificates/auth/auth.key 4096

# Generate auth csr
openssl req -new -sha256 -key certificates/auth/auth.key -out certificates/auth/auth.csr -subj "//C=ES\ST=CA\L=Barcelona\O=anyOpsOS\OU=API Auth\CN=auth.anyopsos.local"

# Sign auth csr
openssl x509 -req -days 365 -in certificates/auth/auth.csr -CA certificates/ca/ca.cert -CAkey certificates/ca/ca.key -CAcreateserial -out certificates/auth/auth.cert


# Generate filesystem key
openssl genrsa -out certificates/filesystem/filesystem.key 4096

# Generate filesystem csr
openssl req -new -sha256 -key certificates/filesystem/filesystem.key -out certificates/filesystem/filesystem.csr -subj "//C=ES\ST=CA\L=Barcelona\O=anyOpsOS\OU=API Auth\CN=filesystem.anyopsos.local"

# Sign filesystem csr
openssl x509 -req -days 365 -in certificates/filesystem/filesystem.csr -CA certificates/ca/ca.cert -CAkey certificates/ca/ca.key -CAcreateserial -out certificates/filesystem/filesystem.cert


# Generate core key
openssl genrsa -out certificates/core/core.key 4096

# Generate core csr
openssl req -new -sha256 -key certificates/core/core.key -out certificates/core/core.csr -subj "//C=ES\ST=CA\L=Barcelona\O=anyOpsOS\OU=API Auth\CN=core.anyopsos.local"

# Sign core csr
openssl x509 -req -days 365 -in certificates/core/core.csr -CA certificates/ca/ca.cert -CAkey certificates/ca/ca.key -CAcreateserial -out certificates/core/core.cert
