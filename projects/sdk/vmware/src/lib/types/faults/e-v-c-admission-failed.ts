import {NotSupportedHostInCluster} from './not-supported-host-in-cluster';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface EVCAdmissionFailed extends NotSupportedHostInCluster {
  faults?: LocalizedMethodFault[];
}