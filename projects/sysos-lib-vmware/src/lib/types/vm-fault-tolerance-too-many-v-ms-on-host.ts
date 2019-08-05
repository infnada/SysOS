import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Int} from './int';

export interface VmFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: Int;
}
