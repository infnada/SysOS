import {DynamicData} from './dynamic-data';


export interface HostIpRouteEntry extends DynamicData {
  deviceName?: string;
  gateway: string;
  network: string;
  prefixLength: number;
}