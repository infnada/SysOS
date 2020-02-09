import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface AlarmState extends DynamicData {
  acknowledged?: boolean;
  acknowledgedByUser?: string;
  acknowledgedTime?: string;
  alarm: ManagedObjectReference & { $type: 'Alarm'; };
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  eventKey?: number;
  key: string;
  overallStatus: ManagedEntityStatus;
  time: string;
}