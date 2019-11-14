import {HostConfigFault} from './host-config-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface HostConfigFailed extends HostConfigFault {
  failure: LocalizedMethodFault[];
}
