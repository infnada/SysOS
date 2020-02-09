import {Event} from './event';


export interface UpgradeEvent extends Event {
  message: string;
}