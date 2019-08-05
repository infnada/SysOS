import {DynamicData} from './dynamic-data';

export interface PhysicalNicCdpDeviceCapability extends DynamicData {
  host: boolean;
  igmpEnabled: boolean;
  networkSwitch: boolean;
  repeater: boolean;
  router: boolean;
  sourceRouteBridge: boolean;
  transparentBridge: boolean;
}
