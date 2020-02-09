import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostUnresolvedVmfsResignatureSpec} from '../data/host-unresolved-vmfs-resignature-spec';


export interface ResignatureUnresolvedVmfsVolume_Task {
  _this: ManagedObjectReference;
  resolutionSpec: HostUnresolvedVmfsResignatureSpec;
}