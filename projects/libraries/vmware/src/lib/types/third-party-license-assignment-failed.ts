import {RuntimeFault} from './runtime-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface ThirdPartyLicenseAssignmentFailed extends RuntimeFault {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  module?: string;
}
