import {VmConfigFault} from './vm-config-fault';

export interface OvfConsumerValidationFault extends VmConfigFault {
  extensionKey: string;
  extensionName: string;
  message: string;
}
