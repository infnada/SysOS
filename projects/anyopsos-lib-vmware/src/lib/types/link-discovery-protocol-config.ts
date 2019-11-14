import {DynamicData} from './dynamic-data';

export interface LinkDiscoveryProtocolConfig extends DynamicData {
  operation: string;
  protocol: string;
}
