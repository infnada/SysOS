import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualMachineNetworkShaperInfo extends DynamicData {
  averageBps?: Long;
  burstSize?: Long;
  enabled?: boolean;
  peakBps?: Long;
}
