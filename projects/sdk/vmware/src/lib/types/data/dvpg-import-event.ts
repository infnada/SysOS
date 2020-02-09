import {DVPortgroupEvent} from './d-v-portgroup-event';


export interface DvpgImportEvent extends DVPortgroupEvent {
  importType: string;
}