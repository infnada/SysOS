import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveVirtualSwitch {
  _this: ManagedObjectReference;
  vswitchName: string;
}