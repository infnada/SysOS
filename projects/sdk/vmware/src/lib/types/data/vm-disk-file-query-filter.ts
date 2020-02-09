import {DynamicData} from './dynamic-data';


export interface VmDiskFileQueryFilter extends DynamicData {
  controllerType?: string[];
  diskType?: string[];
  encrypted?: boolean;
  matchHardwareVersion?: number[];
  thin?: boolean;
}