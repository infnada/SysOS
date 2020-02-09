import {MethodFault} from './method-fault';


export interface InvalidProperty extends MethodFault {
  name: string;
}