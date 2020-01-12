import {VmEvent} from './vm-event';

export interface VmUpgradeCompleteEvent extends VmEvent {
  version: string;
}
