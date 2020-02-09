import {DvsEvent} from './dvs-event';


export interface RollbackEvent extends DvsEvent {
  hostName: string;
  methodName?: string;
}