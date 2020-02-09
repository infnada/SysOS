import {DynamicData} from './dynamic-data';


export interface IpPoolIpPoolConfigInfo extends DynamicData {
  dhcpServerAvailable?: boolean;
  dns?: string[];
  gateway?: string;
  ipPoolEnabled?: boolean;
  netmask?: string;
  range?: string;
  subnetAddress?: string;
}