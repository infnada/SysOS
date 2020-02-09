import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveLicense {
  _this: ManagedObjectReference;
  licenseKey: string;
}