import {DynamicData} from './dynamic-data';


export interface NetIpConfigSpecIpAddressSpec extends DynamicData {
  ipAddress: string;
  operation: string;
  prefixLength: number;
}