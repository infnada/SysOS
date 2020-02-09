import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeselectVnicForNicType {
  _this: ManagedObjectReference;
  nicType: string;
  device: string;
}