import {DynamicData} from './dynamic-data';

import {MethodFault} from './method-fault';
export interface LocalizedMethodFault extends DynamicData {
  fault: MethodFault;
  localizedMessage?: string;
}
