import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPatchManagerLocator} from '../data/host-patch-manager-locator';


export interface ScanHostPatch_Task {
  _this: ManagedObjectReference;
  repository: HostPatchManagerLocator;
  updateID?: string[];
}