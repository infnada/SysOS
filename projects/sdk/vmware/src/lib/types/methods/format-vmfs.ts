import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVmfsSpec} from '../data/host-vmfs-spec';


export interface FormatVmfs {
  _this: ManagedObjectReference;
  createSpec: HostVmfsSpec;
}