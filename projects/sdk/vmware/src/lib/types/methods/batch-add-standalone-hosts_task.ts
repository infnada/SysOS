import {ManagedObjectReference} from '../data/managed-object-reference';
import {FolderNewHostSpec} from '../data/folder-new-host-spec';
import {ComputeResourceConfigSpec} from '../data/compute-resource-config-spec';


export interface BatchAddStandaloneHosts_Task {
  _this: ManagedObjectReference;
  newHosts?: FolderNewHostSpec[];
  compResSpec?: ComputeResourceConfigSpec;
  addConnected: boolean;
}