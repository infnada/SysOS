import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveLicenseLabel {
  _this: ManagedObjectReference;
  licenseKey: string;
  labelKey: string;
}