import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VmDiskFileQueryFilter extends DynamicData {
  controllerType?: string[];
  diskType?: string[];
  encrypted?: boolean;
  matchHardwareVersion?: Int[];
  thin?: boolean;
}
