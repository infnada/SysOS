import {DynamicData} from './dynamic-data';

import {CryptoSpec} from './crypto-spec';

export interface VirtualDeviceConfigSpecBackingSpec extends DynamicData {
  crypto?: CryptoSpec;
  parent?: VirtualDeviceConfigSpecBackingSpec;
}