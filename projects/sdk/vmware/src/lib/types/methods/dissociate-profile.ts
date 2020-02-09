import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DissociateProfile {
  _this: ManagedObjectReference;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}