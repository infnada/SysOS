import {DynamicData} from './dynamic-data';


export interface HostIpConfigIpV6Address extends DynamicData {
  dadState?: string;
  ipAddress: string;
  lifetime?: string;
  operation?: string;
  origin?: string;
  prefixLength: number;
}