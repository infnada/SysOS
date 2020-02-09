import {DynamicData} from './dynamic-data';


export interface HostIpmiInfo extends DynamicData {
  bmcIpAddress?: string;
  bmcMacAddress?: string;
  login?: string;
  password?: string;
}