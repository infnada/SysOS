import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostRuntimeInfoNetStackInstanceRuntimeInfo extends DynamicData {
  maxNumberOfConnections?: Int;
  netStackInstanceKey?: string;
  vmknicKeys?: string[];
}
