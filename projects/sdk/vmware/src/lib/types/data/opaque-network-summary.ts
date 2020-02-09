import {NetworkSummary} from './network-summary';


export interface OpaqueNetworkSummary extends NetworkSummary {
  opaqueNetworkId: string;
  opaqueNetworkType: string;
}