import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DVSNetworkResourceManagementCapability extends DynamicData {
  networkResourceManagementSupported: boolean;
  networkResourcePoolHighShareValue: Int;
  qosSupported: boolean;
  userDefinedInfraTrafficPoolSupported?: boolean;
  userDefinedNetworkResourcePoolsSupported: boolean;
}
