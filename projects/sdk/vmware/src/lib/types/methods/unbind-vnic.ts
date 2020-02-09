import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UnbindVnic {
  _this: ManagedObjectReference;
  iScsiHbaName: string;
  vnicDevice: string;
  force: boolean;
}