import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPatchManagerPatchManagerOperationSpec} from '../data/host-patch-manager-patch-manager-operation-spec';


export interface UninstallHostPatch_Task {
  _this: ManagedObjectReference;
  bulletinIds?: string[];
  spec?: HostPatchManagerPatchManagerOperationSpec;
}