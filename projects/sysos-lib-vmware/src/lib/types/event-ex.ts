import {Event} from './event';

import {KeyAnyValue} from './key-any-value';
import {LocalizedMethodFault} from './localized-method-fault';
export interface EventEx extends Event {
  arguments?: KeyAnyValue[];
  eventTypeId: string;
  fault?: LocalizedMethodFault;
  message?: string;
  objectId?: string;
  objectName?: string;
  objectType?: string;
  severity?: string;
}
