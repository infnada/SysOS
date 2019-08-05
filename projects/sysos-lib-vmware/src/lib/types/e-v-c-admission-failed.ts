import {NotSupportedHostInCluster} from './not-supported-host-in-cluster';

import {LocalizedMethodFault} from './localized-method-fault';
export interface EVCAdmissionFailed extends NotSupportedHostInCluster {
  faults?: LocalizedMethodFault[];
}
