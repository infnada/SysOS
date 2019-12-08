import {DynamicData} from './dynamic-data';
import {FcoeConfig} from './fcoe-config';
import {PhysicalNicLinkInfo} from './physical-nic-link-info';
import {PhysicalNicSpec} from './physical-nic-spec';

export interface PhysicalNic extends DynamicData {
  autoNegotiateSupported?: boolean;
  device: string;
  driver?: string;
  enhancedNetworkingStackSupported?: boolean;
  fcoeConfiguration?: FcoeConfig;
  key?: string;
  linkSpeed?: PhysicalNicLinkInfo;
  mac: string;
  pci: string;
  resourcePoolSchedulerAllowed?: boolean;
  resourcePoolSchedulerDisallowedReason?: string[];
  spec: PhysicalNicSpec;
  validLinkSpecification?: PhysicalNicLinkInfo[];
  wakeOnLanSupported: boolean;
}
