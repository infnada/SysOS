import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostIpRouteEntry extends DynamicData {
  deviceName?: string;
  gateway: string;
  network: string;
  prefixLength: Int;
}
