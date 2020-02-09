import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVirtualNicSpec} from '../data/host-virtual-nic-spec';


export interface AddVirtualNic {
  _this: ManagedObjectReference;
  portgroup: string;
  nic: HostVirtualNicSpec;
}