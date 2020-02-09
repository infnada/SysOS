import {ManagedObjectReference} from '../data/managed-object-reference';
import {FolderNewHostSpec} from '../data/folder-new-host-spec';
import {ComputeResourceConfigSpec} from '../data/compute-resource-config-spec';


export interface BatchAddHostsToCluster_Task {
  _this: ManagedObjectReference;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
  newHosts?: FolderNewHostSpec[];
  existingHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  compResSpec?: ComputeResourceConfigSpec;
  desiredState?: string;
}