import {OvfConsumerCallbackFault} from './ovf-consumer-callback-fault';

import {KeyValue} from '../data/key-value';

export interface OvfConsumerFault extends OvfConsumerCallbackFault {
  errorKey: string;
  message: string;
  params?: KeyValue[];
}