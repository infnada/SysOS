import {DateTime} from "./date-time";
import {ManagedObjectReference} from "./managed-object-reference";
import {ManagedEntityStatus} from "./managed-entity-status";

export interface AlarmState {
  acknowledged?: boolean;
  acknowledgedByUser?: string;
  acknowledgedTime?: DateTime;
  alarm: ManagedObjectReference & { $type: 'Alarm' };
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  eventKey?: number;
  key: string;
  overallStatus: ManagedEntityStatus;
  time: DateTime;
}
