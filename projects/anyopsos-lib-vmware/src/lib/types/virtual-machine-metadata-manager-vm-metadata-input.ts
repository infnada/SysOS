import {DynamicData} from './dynamic-data';

import {VirtualMachineMetadataManagerVmMetadata} from './virtual-machine-metadata-manager-vm-metadata';
export interface VirtualMachineMetadataManagerVmMetadataInput extends DynamicData {
  operation: string;
  vmMetadata: VirtualMachineMetadataManagerVmMetadata;
}
