
import {LocalizedMethodFault} from '../data/localized-method-fault';
import {LocalizableMessage} from '../data/localizable-message';

export interface MethodFault {
  faultCause?: LocalizedMethodFault;
  faultMessage?: LocalizableMessage[];
}