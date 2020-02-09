import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AcquireTicket {
  _this: ManagedObjectReference;
  ticketType: string;
}