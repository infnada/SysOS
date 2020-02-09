import {DynamicData} from './dynamic-data';


export interface HostPowerPolicy extends DynamicData {
  description: string;
  key: number;
  name: string;
  shortName: string;
}