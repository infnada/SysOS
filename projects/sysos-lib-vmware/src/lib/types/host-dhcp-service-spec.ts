import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostDhcpServiceSpec extends DynamicData {
  defaultLeaseDuration: Int;
  ipSubnetAddr: string;
  ipSubnetMask: string;
  leaseBeginIp: string;
  leaseEndIp: string;
  maxLeaseDuration: Int;
  unlimitedLease: boolean;
  virtualSwitch: string;
}
