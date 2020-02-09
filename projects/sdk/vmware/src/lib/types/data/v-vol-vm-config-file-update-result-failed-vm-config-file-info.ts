import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface VVolVmConfigFileUpdateResultFailedVmConfigFileInfo extends DynamicData {
  fault: LocalizedMethodFault;
  targetConfigVVolId: string;
}