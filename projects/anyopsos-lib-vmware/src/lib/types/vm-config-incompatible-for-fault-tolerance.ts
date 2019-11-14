import {VmConfigFault} from './vm-config-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface VmConfigIncompatibleForFaultTolerance extends VmConfigFault {
  fault?: LocalizedMethodFault;
}
