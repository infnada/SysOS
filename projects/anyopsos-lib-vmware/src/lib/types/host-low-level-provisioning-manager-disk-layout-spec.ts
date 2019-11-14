import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostLowLevelProvisioningManagerDiskLayoutSpec extends DynamicData {
  busNumber: Int;
  controllerType: string;
  dstFilename: string;
  srcFilename: string;
  unitNumber: Int;
}
