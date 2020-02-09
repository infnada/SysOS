import {VmEvent} from './vm-event';


export interface VmReloadFromPathEvent extends VmEvent {
  configPath: string;
}