import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AcknowledgeAlarm {
  _this: ManagedObjectReference;
  alarm: ManagedObjectReference & { $type: 'Alarm'; };
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}