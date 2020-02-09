import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDiagnosticPartitionCreateSpec} from '../data/host-diagnostic-partition-create-spec';


export interface CreateDiagnosticPartition {
  _this: ManagedObjectReference;
  spec: HostDiagnosticPartitionCreateSpec;
}