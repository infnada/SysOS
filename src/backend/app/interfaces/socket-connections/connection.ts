export interface Connection {
  type: 'ssh' | 'sftp' | 'linux' | 'kubernetes' | 'docker' | 'snmp';
  uuid: string;
}
