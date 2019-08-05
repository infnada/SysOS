import {VmEvent} from './vm-event';

export interface VmMacChangedEvent extends VmEvent {
  adapter: string;
  newMac: string;
  oldMac: string;
}
