import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';


export interface OvfConsumerUndefinedPrefix extends OvfConsumerCallbackFault {
  prefix: string;
}