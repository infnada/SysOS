import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {AboutInfo} from './about-info';

export interface DatacenterBasicConnectInfo extends DynamicData {
  error?: LocalizedMethodFault;
  hardwareModel?: string;
  hardwareVendor?: string;
  hostname?: string;
  hostProductInfo?: AboutInfo;
  numPoweredOnVm?: number;
  numVm?: number;
  serverIp?: string;
}