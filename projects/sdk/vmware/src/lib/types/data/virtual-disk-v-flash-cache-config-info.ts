import {DynamicData} from './dynamic-data';


export interface VirtualDiskVFlashCacheConfigInfo extends DynamicData {
  blockSizeInKB?: number;
  cacheConsistencyType?: string;
  cacheMode?: string;
  reservationInMB?: number;
  vFlashModule?: string;
}