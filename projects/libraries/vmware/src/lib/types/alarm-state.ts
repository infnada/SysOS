import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedEntityStatus} from './managed-entity-status';
import {Int} from './int';
import {DateTime} from './date-time';
export interface AlarmState extends DynamicData {
  acknowledged?: boolean;
  acknowledgedByUser?: string;
  acknowledgedTime?: DateTime;
  alarm: ManagedObjectReference & { $type: 'Alarm' };
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  eventKey?: Int;
  key: string;
  overallStatus: ManagedEntityStatus;
  time: DateTime;
}
