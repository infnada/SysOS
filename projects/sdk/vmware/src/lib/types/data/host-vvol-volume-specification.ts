import {DynamicData} from './dynamic-data';

import {VASAStorageArray} from './v-a-s-a-storage-array';
import {VimVasaProviderInfo} from './vim-vasa-provider-info';

export interface HostVvolVolumeSpecification extends DynamicData {
  maxSizeInMB: number;
  storageArray?: VASAStorageArray[];
  uuid: string;
  vasaProviderInfo?: VimVasaProviderInfo[];
  volumeName: string;
}