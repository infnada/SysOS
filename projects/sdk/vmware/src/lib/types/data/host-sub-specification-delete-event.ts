import {HostEvent} from './host-event';


export interface HostSubSpecificationDeleteEvent extends HostEvent {
  subSpecName: string;
}