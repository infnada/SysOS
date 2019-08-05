import {DynamicData} from './dynamic-data';

export interface VASAStorageArray extends DynamicData {
  modelId: string;
  name: string;
  uuid: string;
  vendorId: string;
}
