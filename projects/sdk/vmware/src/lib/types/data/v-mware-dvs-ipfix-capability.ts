import {DynamicData} from './dynamic-data';


export interface VMwareDvsIpfixCapability extends DynamicData {
  ipfixSupported?: boolean;
  ipv6ForIpfixSupported?: boolean;
  observationDomainIdSupported?: boolean;
}