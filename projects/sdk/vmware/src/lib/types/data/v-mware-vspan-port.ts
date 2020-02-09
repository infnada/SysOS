import {DynamicData} from './dynamic-data';


export interface VMwareVspanPort extends DynamicData {
  ipAddress?: string[];
  portKey?: string[];
  uplinkPortName?: string[];
  vlans?: number[];
  wildcardPortConnecteeType?: string[];
}