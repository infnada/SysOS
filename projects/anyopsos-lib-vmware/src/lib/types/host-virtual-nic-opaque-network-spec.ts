import {DynamicData} from './dynamic-data';

export interface HostVirtualNicOpaqueNetworkSpec extends DynamicData {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}
