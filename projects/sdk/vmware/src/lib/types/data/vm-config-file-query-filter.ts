import {DynamicData} from './dynamic-data';


export interface VmConfigFileQueryFilter extends DynamicData {
  encrypted?: boolean;
  matchConfigVersion?: number[];
}