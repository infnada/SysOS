import {DvsFault} from './dvs-fault';

export interface RollbackFailure extends DvsFault {
  entityName: string;
  entityType: string;
}
