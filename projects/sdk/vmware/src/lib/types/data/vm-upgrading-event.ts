import {VmEvent} from './vm-event';


export interface VmUpgradingEvent extends VmEvent {
  version: string;
}