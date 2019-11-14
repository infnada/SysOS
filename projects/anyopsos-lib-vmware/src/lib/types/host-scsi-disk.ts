import {ScsiLun} from './scsi-lun';

import {HostDiskDimensionsLba} from './host-disk-dimensions-lba';
import {VsanHostVsanDiskInfo} from './vsan-host-vsan-disk-info';
export interface HostScsiDisk extends ScsiLun {
  capacity: HostDiskDimensionsLba;
  devicePath: string;
  emulatedDIXDIFEnabled?: boolean;
  localDisk?: boolean;
  physicalLocation?: string[];
  scsiDiskType?: string;
  ssd?: boolean;
  vsanDiskInfo?: VsanHostVsanDiskInfo;
}
