import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CheckCompliance_Task {
  _this: ManagedObjectReference;
  profile?: ManagedObjectReference & { $type: 'Profile[]'; };
  entity?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}