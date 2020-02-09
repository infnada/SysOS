import {DvsFault} from './dvs-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface BackupBlobWriteFailure extends DvsFault {
  entityName: string;
  entityType: string;
  fault: LocalizedMethodFault;
}