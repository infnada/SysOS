import {GuestAuthentication} from './guest-authentication';


export interface TicketedSessionAuthentication extends GuestAuthentication {
  ticket: string;
}