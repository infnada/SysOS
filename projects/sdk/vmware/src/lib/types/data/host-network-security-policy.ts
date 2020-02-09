import {DynamicData} from './dynamic-data';


export interface HostNetworkSecurityPolicy extends DynamicData {
  allowPromiscuous?: boolean;
  forgedTransmits?: boolean;
  macChanges?: boolean;
}