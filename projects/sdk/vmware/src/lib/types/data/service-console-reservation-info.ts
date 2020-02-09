import {DynamicData} from './dynamic-data';


export interface ServiceConsoleReservationInfo extends DynamicData {
  serviceConsoleReserved: number;
  serviceConsoleReservedCfg: number;
  unreserved: number;
}