import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface HostStorageSystemDiskLocatorLedResult extends DynamicData {
  fault: LocalizedMethodFault;
  key: string;
}
