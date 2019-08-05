import {DynamicData} from './dynamic-data';

import {HostScsiDisk} from './host-scsi-disk';
import {HostScsiDisk} from './host-scsi-disk';
export interface VsanHostDiskMapping extends DynamicData {
  nonSsd: HostScsiDisk[];
  ssd: HostScsiDisk;
}
