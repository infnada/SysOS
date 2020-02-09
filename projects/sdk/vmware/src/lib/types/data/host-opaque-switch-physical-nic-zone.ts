import {DynamicData} from './dynamic-data';


export interface HostOpaqueSwitchPhysicalNicZone extends DynamicData {
  key: string;
  pnicDevice?: string[];
}