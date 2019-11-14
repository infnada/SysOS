import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Int} from './int';

export interface VmSmpFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: Int;
}
