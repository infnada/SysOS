import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SelectVnicForNicType {
  _this: ManagedObjectReference;
  nicType: string;
  device: string;
}