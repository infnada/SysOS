import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface ImportOperationBulkFaultFaultOnImport extends DynamicData {
  entityType?: string;
  fault: LocalizedMethodFault;
  key?: string;
}