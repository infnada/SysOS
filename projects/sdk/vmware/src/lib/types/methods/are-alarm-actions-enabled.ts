import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AreAlarmActionsEnabled {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}