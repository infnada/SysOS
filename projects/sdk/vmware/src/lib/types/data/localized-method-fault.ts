import {DynamicData} from './dynamic-data';

import {MethodFault} from '../faults/method-fault';

export interface LocalizedMethodFault extends DynamicData {
  fault: MethodFault;
  localizedMessage?: string;
}