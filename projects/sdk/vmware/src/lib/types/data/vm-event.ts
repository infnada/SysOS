import {Event} from './event';


export interface VmEvent extends Event {
  template: boolean;
}