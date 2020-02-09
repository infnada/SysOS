import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveMonitoredEntities {
  _this: ManagedObjectReference;
  providerId: string;
  entities?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}