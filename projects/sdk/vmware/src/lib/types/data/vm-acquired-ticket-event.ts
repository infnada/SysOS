import {VmEvent} from './vm-event';


export interface VmAcquiredTicketEvent extends VmEvent {
  ticketType: string;
}