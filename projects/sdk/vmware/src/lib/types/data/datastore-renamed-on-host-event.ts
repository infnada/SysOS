import {HostEvent} from './host-event';


export interface DatastoreRenamedOnHostEvent extends HostEvent {
  newName: string;
  oldName: string;
}