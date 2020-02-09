import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPatchManagerPatchManagerOperationSpec} from '../data/host-patch-manager-patch-manager-operation-spec';


export interface QueryHostPatch_Task {
  _this: ManagedObjectReference;
  spec?: HostPatchManagerPatchManagerOperationSpec;
}