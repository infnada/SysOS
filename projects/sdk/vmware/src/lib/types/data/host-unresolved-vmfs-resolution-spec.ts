import {DynamicData} from './dynamic-data';


export interface HostUnresolvedVmfsResolutionSpec extends DynamicData {
  extentDevicePath: string[];
  uuidResolution: string;
}