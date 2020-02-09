import {DynamicData} from './dynamic-data';


export interface HostLowLevelProvisioningManagerFileReserveResult extends DynamicData {
  baseName: string;
  parentDir: string;
  reservedName: string;
}