import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';


export interface OvfConsumerCommunicationError extends OvfConsumerCallbackFault {
  description: string;
}