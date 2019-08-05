import {DvsFault} from './dvs-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface BackupBlobWriteFailure extends DvsFault {
  entityName: string;
  entityType: string;
  fault: LocalizedMethodFault;
}
