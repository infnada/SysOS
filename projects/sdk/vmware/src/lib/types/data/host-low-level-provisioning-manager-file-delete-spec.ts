import {DynamicData} from './dynamic-data';


export interface HostLowLevelProvisioningManagerFileDeleteSpec extends DynamicData {
  fileName: string;
  fileType: string;
}