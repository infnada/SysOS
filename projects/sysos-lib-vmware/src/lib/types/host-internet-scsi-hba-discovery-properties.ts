import {DynamicData} from './dynamic-data';

export interface HostInternetScsiHbaDiscoveryProperties extends DynamicData {
  iSnsDiscoveryEnabled?: string;
  iSnsHost?: string;
  sendTargetsDiscoveryEnabled?: string;
  slpHost?: string;
  staticTargetDiscoveryEnabled: boolean;
}
