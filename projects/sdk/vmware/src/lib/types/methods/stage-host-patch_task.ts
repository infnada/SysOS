import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPatchManagerPatchManagerOperationSpec} from '../data/host-patch-manager-patch-manager-operation-spec';


export interface StageHostPatch_Task {
  _this: ManagedObjectReference;
  metaUrls?: string[];
  bundleUrls?: string[];
  vibUrls?: string[];
  spec?: HostPatchManagerPatchManagerOperationSpec;
}