import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface HostStorageSystemScsiLunResult extends DynamicData {
  fault?: LocalizedMethodFault;
  key: string;
}
