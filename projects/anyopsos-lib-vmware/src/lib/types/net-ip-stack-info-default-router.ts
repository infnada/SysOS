import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface NetIpStackInfoDefaultRouter extends DynamicData {
  device: string;
  ipAddress: string;
  lifetime: DateTime;
  preference: string;
}
