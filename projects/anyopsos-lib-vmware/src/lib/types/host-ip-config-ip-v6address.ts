import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface HostIpConfigIpV6Address extends DynamicData {
  dadState?: string;
  ipAddress: string;
  lifetime?: DateTime;
  operation?: string;
  origin?: string;
  prefixLength: Int;
}
