import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';
import {Int} from './int';

export interface OvfConsumerInvalidSection extends OvfConsumerCallbackFault {
  description: string;
  lineNumber: Int;
}
