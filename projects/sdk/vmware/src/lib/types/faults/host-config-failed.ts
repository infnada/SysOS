import {HostConfigFault} from './host-config-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface HostConfigFailed extends HostConfigFault {
  failure: LocalizedMethodFault[];
}