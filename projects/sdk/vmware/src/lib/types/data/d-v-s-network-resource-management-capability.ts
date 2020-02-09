import {DynamicData} from './dynamic-data';


export interface DVSNetworkResourceManagementCapability extends DynamicData {
  networkResourceControlVersion3Supported?: boolean;
  networkResourceManagementSupported: boolean;
  networkResourcePoolHighShareValue: number;
  qosSupported: boolean;
  userDefinedInfraTrafficPoolSupported?: boolean;
  userDefinedNetworkResourcePoolsSupported: boolean;
}