import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateLicenseLabel {
  _this: ManagedObjectReference;
  licenseKey: string;
  labelKey: string;
  labelValue: string;
}