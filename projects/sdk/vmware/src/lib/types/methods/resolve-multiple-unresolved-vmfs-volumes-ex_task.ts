import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostUnresolvedVmfsResolutionSpec} from '../data/host-unresolved-vmfs-resolution-spec';


export interface ResolveMultipleUnresolvedVmfsVolumesEx_Task {
  _this: ManagedObjectReference;
  resolutionSpec: HostUnresolvedVmfsResolutionSpec[];
}