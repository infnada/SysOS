import {DynamicData} from './dynamic-data';


export interface HostLowLevelProvisioningManagerFileReserveSpec extends DynamicData {
  baseName: string;
  fileType: string;
  parentDir: string;
  storageProfile: string;
}