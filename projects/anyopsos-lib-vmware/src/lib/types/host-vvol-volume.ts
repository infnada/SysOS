import {HostFileSystemVolume} from './host-file-system-volume';

import {VVolHostPE} from './v-vol-host-p-e';
import {VASAStorageArray} from './v-a-s-a-storage-array';
import {VimVasaProviderInfo} from './vim-vasa-provider-info';
export interface HostVvolVolume extends HostFileSystemVolume {
  hostPE?: VVolHostPE[];
  scId: string;
  storageArray?: VASAStorageArray[];
  vasaProviderInfo?: VimVasaProviderInfo[];
}
