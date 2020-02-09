import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface HostDiskConfigurationResult extends DynamicData {
  devicePath?: string;
  fault?: LocalizedMethodFault;
  success?: boolean;
}