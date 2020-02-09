import {DynamicData} from './dynamic-data';


export interface VirtualMachineMetadataManagerVmMetadata extends DynamicData {
  metadata?: string;
  vmId: string;
}