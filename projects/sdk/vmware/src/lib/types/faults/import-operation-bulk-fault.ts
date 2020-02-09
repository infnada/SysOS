import {DvsFault} from './dvs-fault';

import {ImportOperationBulkFaultFaultOnImport} from '../data/import-operation-bulk-fault-fault-on-import';

export interface ImportOperationBulkFault extends DvsFault {
  importFaults: ImportOperationBulkFaultFaultOnImport[];
}