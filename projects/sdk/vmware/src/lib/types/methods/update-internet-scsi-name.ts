import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateInternetScsiName {
  _this: ManagedObjectReference;
  iScsiHbaDevice: string;
  iScsiName: string;
}