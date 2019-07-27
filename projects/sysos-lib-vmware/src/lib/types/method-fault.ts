import {LocalizedMethodFault} from './localized-method-fault';
import {LocalizableMessage} from './localizable-message';

export interface MethodFault {
  faultCause?: LocalizedMethodFault;
  faultMessage?: LocalizableMessage[];
}
