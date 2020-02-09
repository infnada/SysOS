import {DynamicData} from './dynamic-data';

import {HostConnectSpec} from './host-connect-spec';

export interface FolderNewHostSpec extends DynamicData {
  esxLicense?: string;
  hostCnxSpec: HostConnectSpec;
}