import {RuntimeFault} from './runtime-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface InvalidProfileReferenceHost extends RuntimeFault {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  profile?: ManagedObjectReference & { $type: 'Profile' };
  profileName?: string;
  reason?: string;
}
