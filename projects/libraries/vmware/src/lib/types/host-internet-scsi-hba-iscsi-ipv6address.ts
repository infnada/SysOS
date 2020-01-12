import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostInternetScsiHbaIscsiIpv6Address extends DynamicData {
  address: string;
  operation?: string;
  origin: string;
  prefixLength: Int;
}
