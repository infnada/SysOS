import {RuntimeFault} from './runtime-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface UnexpectedFault extends RuntimeFault {
  fault?: LocalizedMethodFault;
  faultName: string;
}
