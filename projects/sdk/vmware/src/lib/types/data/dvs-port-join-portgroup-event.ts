import {DvsEvent} from './dvs-event';


export interface DvsPortJoinPortgroupEvent extends DvsEvent {
  portgroupKey: string;
  portgroupName: string;
  portKey: string;
}