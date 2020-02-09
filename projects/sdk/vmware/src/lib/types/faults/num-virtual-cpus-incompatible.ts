import {VmConfigFault} from './vm-config-fault';


export interface NumVirtualCpusIncompatible extends VmConfigFault {
  numCpu: number;
  reason: string;
}