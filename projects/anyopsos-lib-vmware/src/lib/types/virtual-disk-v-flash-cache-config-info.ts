import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualDiskVFlashCacheConfigInfo extends DynamicData {
  blockSizeInKB?: Long;
  cacheConsistencyType?: string;
  cacheMode?: string;
  reservationInMB?: Long;
  vFlashModule?: string;
}
