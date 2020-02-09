import {DynamicData} from './dynamic-data';


export interface VmDiskFileQueryFlags extends DynamicData {
  capacityKb: boolean;
  controllerType?: boolean;
  diskExtents?: boolean;
  diskType: boolean;
  encryption?: boolean;
  hardwareVersion: boolean;
  thin?: boolean;
}