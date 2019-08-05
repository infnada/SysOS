import {DynamicData} from './dynamic-data';

import {PhysicalNicCdpDeviceCapability} from './physical-nic-cdp-device-capability';
import {Int} from './int';
export interface PhysicalNicCdpInfo extends DynamicData {
  address?: string;
  cdpVersion?: Int;
  deviceCapability?: PhysicalNicCdpDeviceCapability;
  devId?: string;
  fullDuplex?: boolean;
  hardwarePlatform?: string;
  ipPrefix?: string;
  ipPrefixLen?: Int;
  location?: string;
  mgmtAddr?: string;
  mtu?: Int;
  portId?: string;
  samples?: Int;
  softwareVersion?: string;
  systemName?: string;
  systemOID?: string;
  timeout?: Int;
  ttl?: Int;
  vlan?: Int;
}
