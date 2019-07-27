import {MethodFault} from './method-fault';

export interface LocalizedMethodFault {
  fault: MethodFault;
  localizedMessage: string;
}
