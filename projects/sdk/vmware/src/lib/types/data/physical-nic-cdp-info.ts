import {DynamicData} from './dynamic-data';

import {PhysicalNicCdpDeviceCapability} from './physical-nic-cdp-device-capability';

export interface PhysicalNicCdpInfo extends DynamicData {
  address?: string;
  cdpVersion?: number;
  deviceCapability?: PhysicalNicCdpDeviceCapability;
  devId?: string;
  fullDuplex?: boolean;
  hardwarePlatform?: string;
  ipPrefix?: string;
  ipPrefixLen?: number;
  location?: string;
  mgmtAddr?: string;
  mtu?: number;
  portId?: string;
  samples?: number;
  softwareVersion?: string;
  systemName?: string;
  systemOID?: string;
  timeout?: number;
  ttl?: number;
  vlan?: number;
}