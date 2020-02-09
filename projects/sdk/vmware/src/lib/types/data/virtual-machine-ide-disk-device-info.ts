import {VirtualMachineDiskDeviceInfo} from './virtual-machine-disk-device-info';

import {VirtualMachineIdeDiskDevicePartitionInfo} from './virtual-machine-ide-disk-device-partition-info';

export interface VirtualMachineIdeDiskDeviceInfo extends VirtualMachineDiskDeviceInfo {
  partitionTable?: VirtualMachineIdeDiskDevicePartitionInfo[];
}