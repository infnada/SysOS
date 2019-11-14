import {VmConfigFault} from './vm-config-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmConfigIncompatibleForRecordReplay extends VmConfigFault {
  fault?: LocalizedMethodFault;
}
