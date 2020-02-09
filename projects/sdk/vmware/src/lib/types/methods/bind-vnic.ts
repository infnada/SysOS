import {ManagedObjectReference} from '../data/managed-object-reference';


export interface BindVnic {
  _this: ManagedObjectReference;
  iScsiHbaName: string;
  vnicDevice: string;
}