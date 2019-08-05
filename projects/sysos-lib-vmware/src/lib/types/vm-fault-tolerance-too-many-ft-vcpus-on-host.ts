import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Int} from './int';

export interface VmFaultToleranceTooManyFtVcpusOnHost extends InsufficientResourcesFault {
  hostName?: Int;
}
