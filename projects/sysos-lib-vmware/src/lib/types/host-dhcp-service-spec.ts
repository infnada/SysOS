export interface HostDhcpServiceSpec {
  defaultLeaseDuration: number;
  ipSubnetAddr: string;
  ipSubnetMask: string;
  leaseBeginIp: string;
  leaseEndIp: string;
  maxLeaseDuration: number;
  unlimitedLease: boolean;
  virtualSwitch: string;
}
