import {DynamicData} from './dynamic-data';


export interface HostSnmpDestination extends DynamicData {
  community: string;
  hostName: string;
  port: number;
}