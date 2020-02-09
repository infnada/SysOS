import {LicenseEvent} from './license-event';


export interface HostInventoryFullEvent extends LicenseEvent {
  capacity: number;
}