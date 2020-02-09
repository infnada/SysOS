import {DynamicData} from './dynamic-data';


export interface HostDhcpServiceSpec extends DynamicData {
  defaultLeaseDuration: number;
  ipSubnetAddr: string;
  ipSubnetMask: string;
  leaseBeginIp: string;
  leaseEndIp: string;
  maxLeaseDuration: number;
  unlimitedLease: boolean;
  virtualSwitch: string;
}