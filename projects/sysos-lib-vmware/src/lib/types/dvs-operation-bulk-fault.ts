import {DvsFault} from './dvs-fault';

import {DvsOperationBulkFaultFaultOnHost} from './dvs-operation-bulk-fault-fault-on-host';
export interface DvsOperationBulkFault extends DvsFault {
  hostFault: DvsOperationBulkFaultFaultOnHost[];
}
