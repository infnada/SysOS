import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVirtualNicSpec} from '../data/host-virtual-nic-spec';


export interface UpdateVirtualNic {
  _this: ManagedObjectReference;
  device: string;
  nic: HostVirtualNicSpec;
}