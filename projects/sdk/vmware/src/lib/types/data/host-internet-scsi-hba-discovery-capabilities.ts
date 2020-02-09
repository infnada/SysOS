import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaDiscoveryCapabilities extends DynamicData {
  iSnsDiscoverySettable: boolean;
  sendTargetsDiscoverySettable: boolean;
  slpDiscoverySettable: boolean;
  staticTargetDiscoverySettable: boolean;
}