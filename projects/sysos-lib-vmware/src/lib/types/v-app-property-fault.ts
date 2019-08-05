import {VmConfigFault} from './vm-config-fault';

export interface VAppPropertyFault extends VmConfigFault {
  category: string;
  id: string;
  label: string;
  type: string;
  value: string;
}
