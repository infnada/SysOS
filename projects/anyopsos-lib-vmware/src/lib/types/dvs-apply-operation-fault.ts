import {DvsFault} from './dvs-fault';

import {DvsApplyOperationFaultFaultOnObject} from './dvs-apply-operation-fault-fault-on-object';
export interface DvsApplyOperationFault extends DvsFault {
  objectFault: DvsApplyOperationFaultFaultOnObject[];
}
