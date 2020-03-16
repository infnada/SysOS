export interface Connection {
  type: 'ssh' | 'sftp' | 'linux' | 'kubernetes' | 'docker' | 'snmp' | 'vmware' | 'netapp';
  state: 'disconnected' | 'connected' | 'ready';
  uuid: string;
  description: string;
  autoLogin: boolean;
}
