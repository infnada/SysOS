import {DvsEvent} from './dvs-event';

export interface RecoveryEvent extends DvsEvent {
  dvsUuid?: string;
}
