import {DynamicData} from './dynamic-data';
import {Long} from './long';
import {Float} from './float';

export interface VsanPolicyCost extends DynamicData {
  changeDataSize?: Long;
  changeFlashReadCacheSize?: Long;
  copyDataSize?: Long;
  currentDataSize?: Long;
  currentDiskSpaceToAddressSpaceRatio?: Float;
  currentFlashReadCacheSize?: Long;
  diskSpaceToAddressSpaceRatio?: Long;
  tempDataSize?: Long;
}
