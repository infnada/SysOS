import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface ServiceConsoleReservationInfo extends DynamicData {
  serviceConsoleReserved: Long;
  serviceConsoleReservedCfg: Long;
  unreserved: Long;
}
