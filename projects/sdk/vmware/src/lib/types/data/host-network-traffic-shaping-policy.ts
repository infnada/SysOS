import {DynamicData} from './dynamic-data';


export interface HostNetworkTrafficShapingPolicy extends DynamicData {
  averageBandwidth?: number;
  burstSize?: number;
  enabled?: boolean;
  peakBandwidth?: number;
}