import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VMwareVspanPort extends DynamicData {
  ipAddress?: string[];
  portKey?: string[];
  uplinkPortName?: string[];
  vlans?: Int[];
  wildcardPortConnecteeType?: string[];
}
