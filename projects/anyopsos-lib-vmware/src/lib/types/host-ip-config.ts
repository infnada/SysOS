import {DynamicData} from './dynamic-data';

export interface HostIpConfig extends DynamicData {
  dhcp: boolean;
  ipAddress?: string;
  subnetMask?: string;
}
