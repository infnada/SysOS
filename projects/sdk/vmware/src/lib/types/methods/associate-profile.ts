import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AssociateProfile {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}