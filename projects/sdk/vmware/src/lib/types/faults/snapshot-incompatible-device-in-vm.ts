import {SnapshotFault} from './snapshot-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface SnapshotIncompatibleDeviceInVm extends SnapshotFault {
  fault: LocalizedMethodFault;
}