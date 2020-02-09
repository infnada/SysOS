import {VirtualMachineDiskDeviceInfo} from './virtual-machine-disk-device-info';

import {HostScsiDisk} from './host-scsi-disk';

export interface VirtualMachineScsiDiskDeviceInfo extends VirtualMachineDiskDeviceInfo {
  disk?: HostScsiDisk;
  lunNumber?: number;
  transportHint?: string;
}