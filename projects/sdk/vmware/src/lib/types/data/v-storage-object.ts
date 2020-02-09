import {DynamicData} from './dynamic-data';

import {VStorageObjectConfigInfo} from './v-storage-object-config-info';

export interface VStorageObject extends DynamicData {
  config: VStorageObjectConfigInfo;
}