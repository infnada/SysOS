import {DynamicData} from './dynamic-data';

export interface VMwareDvsIpfixCapability extends DynamicData {
  ipfixSupported?: boolean;
  observationDomainIdSupported?: boolean;
}
