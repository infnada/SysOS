import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';


export interface OvfConsumerInvalidSection extends OvfConsumerCallbackFault {
  description: string;
  lineNumber: number;
}