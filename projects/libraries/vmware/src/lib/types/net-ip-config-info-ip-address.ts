import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface NetIpConfigInfoIpAddress extends DynamicData {
  ipAddress: string;
  lifetime?: DateTime;
  origin?: string;
  prefixLength: Int;
  state?: string;
}
