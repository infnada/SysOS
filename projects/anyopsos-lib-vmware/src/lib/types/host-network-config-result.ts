import {DynamicData} from './dynamic-data';

export interface HostNetworkConfigResult extends DynamicData {
  consoleVnicDevice?: string[];
  vnicDevice?: string[];
}
