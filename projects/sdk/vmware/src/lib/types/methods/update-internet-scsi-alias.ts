import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateInternetScsiAlias {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  iScsiAlias: string;
}