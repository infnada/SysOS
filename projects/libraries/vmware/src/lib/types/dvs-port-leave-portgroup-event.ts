import {DvsEvent} from './dvs-event';

export interface DvsPortLeavePortgroupEvent extends DvsEvent {
  portgroupKey: string;
  portgroupName: string;
  portKey: string;
}
