import {LicenseEvent} from './license-event';
import {Int} from './int';

export interface HostInventoryFullEvent extends LicenseEvent {
  capacity: Int;
}
