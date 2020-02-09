import {VmEvent} from './vm-event';


export interface VmReloadFromPathFailedEvent extends VmEvent {
  configPath: string;
}