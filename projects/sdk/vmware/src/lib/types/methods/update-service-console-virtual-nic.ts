import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVirtualNicSpec} from '../data/host-virtual-nic-spec';


export interface UpdateServiceConsoleVirtualNic {
  _this: ManagedObjectReference;
  device: string;
  nic: HostVirtualNicSpec;
}