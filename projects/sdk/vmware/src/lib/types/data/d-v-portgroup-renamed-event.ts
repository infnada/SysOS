import {DVPortgroupEvent} from './d-v-portgroup-event';


export interface DVPortgroupRenamedEvent extends DVPortgroupEvent {
  newName: string;
  oldName: string;
}