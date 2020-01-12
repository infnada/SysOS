import {DvsEvent} from './dvs-event';

export interface DvsPortCreatedEvent extends DvsEvent {
  portKey: string[];
}
