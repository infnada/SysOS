import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVirtualSwitchSpec} from '../data/host-virtual-switch-spec';


export interface AddVirtualSwitch {
  _this: ManagedObjectReference;
  vswitchName: string;
  spec?: HostVirtualSwitchSpec;
}