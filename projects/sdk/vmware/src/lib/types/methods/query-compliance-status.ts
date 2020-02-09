import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryComplianceStatus {
  _this: ManagedObjectReference;
  profile?: ManagedObjectReference & { $type: 'Profile[]'; };
  entity?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}