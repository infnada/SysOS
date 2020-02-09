import {DynamicData} from './dynamic-data';


export interface NetIpConfigInfoIpAddress extends DynamicData {
  ipAddress: string;
  lifetime?: string;
  origin?: string;
  prefixLength: number;
  state?: string;
}