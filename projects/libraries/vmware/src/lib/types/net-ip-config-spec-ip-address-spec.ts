import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface NetIpConfigSpecIpAddressSpec extends DynamicData {
  ipAddress: string;
  operation: string;
  prefixLength: Int;
}
