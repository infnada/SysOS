import {DynamicData} from './dynamic-data';


export interface HostRuntimeInfoNetStackInstanceRuntimeInfo extends DynamicData {
  currentIpV6Enabled?: boolean;
  maxNumberOfConnections?: number;
  netStackInstanceKey: string;
  state?: string;
  vmknicKeys?: string[];
}