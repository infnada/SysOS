import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {DatastoreCapability} from './datastore-capability';
import {DatastoreSummary} from './datastore-summary';
import {Long} from './long';
export interface VirtualMachineDatastoreInfo extends VirtualMachineTargetInfo {
  capability: DatastoreCapability;
  datastore: DatastoreSummary;
  maxFileSize: Long;
  maxPhysicalRDMFileSize?: Long;
  maxVirtualDiskCapacity?: Long;
  maxVirtualRDMFileSize?: Long;
  mode: string;
  vStorageSupport?: string;
}
