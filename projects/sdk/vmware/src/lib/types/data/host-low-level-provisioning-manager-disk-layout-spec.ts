import {DynamicData} from './dynamic-data';


export interface HostLowLevelProvisioningManagerDiskLayoutSpec extends DynamicData {
  busNumber: number;
  controllerType: string;
  dstFilename: string;
  srcFilename: string;
  unitNumber: number;
}