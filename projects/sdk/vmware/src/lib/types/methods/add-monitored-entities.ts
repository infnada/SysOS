import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AddMonitoredEntities {
  _this: ManagedObjectReference;
  providerId: string;
  entities?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}