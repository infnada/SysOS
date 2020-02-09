import {DynamicData} from './dynamic-data';


export interface VsanPolicyCost extends DynamicData {
  changeDataSize?: number;
  changeFlashReadCacheSize?: number;
  copyDataSize?: number;
  currentDataSize?: number;
  currentDiskSpaceToAddressSpaceRatio?: number;
  currentFlashReadCacheSize?: number;
  diskSpaceToAddressSpaceRatio?: number;
  tempDataSize?: number;
}