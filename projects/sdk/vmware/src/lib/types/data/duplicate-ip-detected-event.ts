import {HostEvent} from './host-event';


export interface DuplicateIpDetectedEvent extends HostEvent {
  duplicateIP: string;
  macAddress: string;
}