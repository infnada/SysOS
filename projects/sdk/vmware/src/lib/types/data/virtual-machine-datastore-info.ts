import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {DatastoreCapability} from './datastore-capability';
import {DatastoreSummary} from './datastore-summary';

export interface VirtualMachineDatastoreInfo extends VirtualMachineTargetInfo {
  capability: DatastoreCapability;
  datastore: DatastoreSummary;
  maxFileSize: number;
  maxPhysicalRDMFileSize?: number;
  maxVirtualDiskCapacity?: number;
  maxVirtualRDMFileSize?: number;
  mode: string;
  vStorageSupport?: string;
}