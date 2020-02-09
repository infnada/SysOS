import {DvsEvent} from './dvs-event';


export interface DvsImportEvent extends DvsEvent {
  importType: string;
}