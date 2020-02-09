import {OvfFault} from './ovf-fault';


export interface OvfConsumerCallbackFault extends OvfFault {
  extensionKey: string;
  extensionName: string;
}