import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HostNetworkTrafficShapingPolicy extends DynamicData {
  averageBandwidth?: Long;
  burstSize?: Long;
  enabled?: boolean;
  peakBandwidth?: Long;
}
