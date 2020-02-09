import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaDiscoveryProperties extends DynamicData {
  iSnsDiscoveryEnabled: boolean;
  iSnsDiscoveryMethod?: string;
  iSnsHost?: string;
  sendTargetsDiscoveryEnabled: boolean;
  slpDiscoveryEnabled: boolean;
  slpDiscoveryMethod?: string;
  slpHost?: string;
  staticTargetDiscoveryEnabled: boolean;
}