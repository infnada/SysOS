import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostVirtualSwitchSpec} from '../data/host-virtual-switch-spec';


export interface UpdateVirtualSwitch {
  _this: ManagedObjectReference;
  vswitchName: string;
  spec: HostVirtualSwitchSpec;
}