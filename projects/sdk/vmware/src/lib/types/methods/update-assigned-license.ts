import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateAssignedLicense {
  _this: ManagedObjectReference;
  entity: string;
  licenseKey: string;
  entityDisplayName?: string;
}