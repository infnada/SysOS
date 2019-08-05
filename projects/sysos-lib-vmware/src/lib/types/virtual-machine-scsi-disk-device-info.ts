import {VirtualMachineDiskDeviceInfo} from './virtual-machine-disk-device-info';

import {HostScsiDisk} from './host-scsi-disk';
import {Int} from './int';
export interface VirtualMachineScsiDiskDeviceInfo extends VirtualMachineDiskDeviceInfo {
  disk?: HostScsiDisk;
  lunNumber?: Int;
  transportHint?: string;
}
