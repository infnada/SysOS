export interface NetAppIface {
  address: string;
  'address-family': string;
  'administrative-status': string;
  comment: string;
  'current-node': string;
  'current-port': string;
  'data-protocols': {
    'data-protocol': string;
  };
  'dns-domain-name': string;
  'failover-group': string;
  'failover-policy': string;
  'firewall-policy': string;
  'home-node': string;
  'home-port': string;
  'interface-name': string;
  ipspace: string;
  'is-auto-revert': boolean;
  'is-dns-update-enabled': boolean;
  'is-home': boolean;
  'is-vip': boolean;
  'lif-uuid': string;
  'listen-for-dns-query': boolean;
  netmask: string;
  'netmask-length': number;
  'operational-status': string;
  role: string;
  'use-failover-group': string;
  vserver: string;
}
