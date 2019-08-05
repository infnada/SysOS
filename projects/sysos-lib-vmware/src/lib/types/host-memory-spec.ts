import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostMemorySpec extends DynamicData {
  serviceConsoleReservation?: Long;
}
