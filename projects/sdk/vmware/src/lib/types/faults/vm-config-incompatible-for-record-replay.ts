import {VmConfigFault} from './vm-config-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface VmConfigIncompatibleForRecordReplay extends VmConfigFault {
  fault?: LocalizedMethodFault;
}