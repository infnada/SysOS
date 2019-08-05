import {DvsEvent} from './dvs-event';

export interface DvsPortDeletedEvent extends DvsEvent {
  portKey: string[];
}
