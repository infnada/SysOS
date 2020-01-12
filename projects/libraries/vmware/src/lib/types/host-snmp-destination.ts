import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostSnmpDestination extends DynamicData {
  community: string;
  hostName: string;
  port: Int;
}
