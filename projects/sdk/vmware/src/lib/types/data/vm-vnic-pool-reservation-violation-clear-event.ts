import {DvsEvent} from './dvs-event';


export interface VmVnicPoolReservationViolationClearEvent extends DvsEvent {
  vmVnicResourcePoolKey: string;
  vmVnicResourcePoolName?: string;
}