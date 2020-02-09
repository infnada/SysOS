import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface MissingProperty extends DynamicData {
  fault: LocalizedMethodFault;
  path: string;
}