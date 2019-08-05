import {DynamicData} from './dynamic-data';

export interface NetIpStackInfoNetToMedia extends DynamicData {
  device: string;
  ipAddress: string;
  physicalAddress: string;
  type: string;
}
