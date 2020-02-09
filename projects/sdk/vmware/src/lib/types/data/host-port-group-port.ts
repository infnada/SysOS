import {DynamicData} from './dynamic-data';


export interface HostPortGroupPort extends DynamicData {
  key?: string;
  mac?: string[];
  type: string;
}