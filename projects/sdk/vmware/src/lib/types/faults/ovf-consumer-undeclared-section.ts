import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';


export interface OvfConsumerUndeclaredSection extends OvfConsumerCallbackFault {
  qualifiedSectionType: string;
}