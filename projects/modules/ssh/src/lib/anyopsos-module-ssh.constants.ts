export const SSH_CONFIG_FILE: string = 'ssh.json';
export const SSH_PORT: number = 22;

export const SSH_TERM: string = 'xterm-color';

export const SSH_ALGORITHMS: { [key: string]: any; } = {
  kex: [
    'ecdh-sha2-nistp256',
    'ecdh-sha2-nistp384',
    'ecdh-sha2-nistp521',
    'diffie-hellman-group-exchange-sha256',
    'diffie-hellman-group14-sha1'
  ],
  cipher: [
    'aes128-ctr',
    'aes192-ctr',
    'aes256-ctr',
    'aes128-gcm',
    'aes128-gcm@openssh.com',
    'aes256-gcm',
    'aes256-gcm@openssh.com',
    'aes256-cbc'
  ],
  hmac: [
    'hmac-sha2-256',
    'hmac-sha2-512',
    'hmac-sha1'
  ],
  compress: [
    'none',
    'zlib@openssh.com',
    'zlib'
  ]
};
