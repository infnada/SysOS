import {DynamicData} from './dynamic-data';


export interface VirtualMachineNetworkShaperInfo extends DynamicData {
  averageBps?: number;
  burstSize?: number;
  enabled?: boolean;
  peakBps?: number;
}