import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HasMonitoredEntity {
  _this: ManagedObjectReference;
  providerId: string;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}