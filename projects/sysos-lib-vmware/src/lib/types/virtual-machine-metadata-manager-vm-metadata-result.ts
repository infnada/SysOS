import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {VirtualMachineMetadataManagerVmMetadata} from './virtual-machine-metadata-manager-vm-metadata';
export interface VirtualMachineMetadataManagerVmMetadataResult extends DynamicData {
  error?: LocalizedMethodFault;
  vmMetadata: VirtualMachineMetadataManagerVmMetadata;
}
