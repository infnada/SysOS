import {RuntimeFault} from './runtime-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface ThirdPartyLicenseAssignmentFailed extends RuntimeFault {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  module: string;
  reason?: string;
}