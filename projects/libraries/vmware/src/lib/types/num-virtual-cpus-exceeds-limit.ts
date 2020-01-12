import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Int} from './int';

export interface NumVirtualCpusExceedsLimit extends InsufficientResourcesFault {
  maxSupportedVcpus: Int;
}
