import {DynamicData} from './dynamic-data';

import {CryptoSpec} from './crypto-spec';
import {VirtualDeviceConfigSpecBackingSpec} from './virtual-device-config-spec-backing-spec';
export interface VirtualDeviceConfigSpecBackingSpec extends DynamicData {
  crypto?: CryptoSpec;
  parent?: VirtualDeviceConfigSpecBackingSpec;
}
