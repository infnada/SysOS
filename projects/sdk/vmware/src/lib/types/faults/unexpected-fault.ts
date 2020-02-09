import {RuntimeFault} from './runtime-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface UnexpectedFault extends RuntimeFault {
  fault?: LocalizedMethodFault;
  faultName: string;
}