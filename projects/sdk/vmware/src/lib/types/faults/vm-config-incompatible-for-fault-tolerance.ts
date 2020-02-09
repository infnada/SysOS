import {VmConfigFault} from './vm-config-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface VmConfigIncompatibleForFaultTolerance extends VmConfigFault {
  fault?: LocalizedMethodFault;
}