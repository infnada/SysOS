import {VmStartingEvent} from './vm-starting-event';

export interface VmUnsupportedStartingEvent extends VmStartingEvent {
  guestId: string;
}
