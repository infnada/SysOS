import {VmConfigFault} from './vm-config-fault';
import {Int} from './int';

export interface NumVirtualCpusIncompatible extends VmConfigFault {
  numCpu: Int;
  reason: string;
}
