import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface HostLowLevelProvisioningManagerFileDeleteResult extends DynamicData {
  fault: LocalizedMethodFault;
  fileName: string;
}
