import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveEntityScheduledTask {
  _this: ManagedObjectReference;
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
}