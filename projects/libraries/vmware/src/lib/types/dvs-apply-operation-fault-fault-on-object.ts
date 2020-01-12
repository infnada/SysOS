import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface DvsApplyOperationFaultFaultOnObject extends DynamicData {
  fault: LocalizedMethodFault;
  objectId: string;
  type: string;
}
