export interface ImConnection {
  type: 'vmware' | 'kubernetes' | 'docker' | 'netapp' | 'linux' | 'windows' | 'snmp';
  uuid: string;
  description: string;
  autologin: boolean;
  save: boolean;
  state: string;
  error?: string;
}
