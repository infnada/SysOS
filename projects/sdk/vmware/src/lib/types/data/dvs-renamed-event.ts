import {DvsEvent} from './dvs-event';


export interface DvsRenamedEvent extends DvsEvent {
  newName: string;
  oldName: string;
}