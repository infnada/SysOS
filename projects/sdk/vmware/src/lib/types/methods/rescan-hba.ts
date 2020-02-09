import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RescanHba {
  _this: ManagedObjectReference;
  hbaDevice: string;
}