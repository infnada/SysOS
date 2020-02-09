import {DvsEvent} from './dvs-event';


export interface VmVnicPoolReservationViolationRaiseEvent extends DvsEvent {
  vmVnicResourcePoolKey: string;
  vmVnicResourcePoolName?: string;
}