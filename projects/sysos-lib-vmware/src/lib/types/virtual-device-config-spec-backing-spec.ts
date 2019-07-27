import {CryptoSpec} from './crypto-spec';

export interface VirtualDeviceConfigSpecBackingSpec {
  crypto?: CryptoSpec;
  parent?: VirtualDeviceConfigSpecBackingSpec;
}
