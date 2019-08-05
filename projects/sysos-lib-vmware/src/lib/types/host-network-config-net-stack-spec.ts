import {DynamicData} from './dynamic-data';

import {HostNetStackInstance} from './host-net-stack-instance';
export interface HostNetworkConfigNetStackSpec extends DynamicData {
  netStackInstance: HostNetStackInstance;
  operation?: string;
}
