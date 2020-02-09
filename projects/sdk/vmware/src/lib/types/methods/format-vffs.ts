import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVffsSpec} from '../data/host-vffs-spec';


export interface FormatVffs {
  _this: ManagedObjectReference;
  createSpec: HostVffsSpec;
}