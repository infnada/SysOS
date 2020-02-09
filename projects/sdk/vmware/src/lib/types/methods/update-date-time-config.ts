import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDateTimeConfig} from '../data/host-date-time-config';


export interface UpdateDateTimeConfig {
  _this: ManagedObjectReference;
  config: HostDateTimeConfig;
}