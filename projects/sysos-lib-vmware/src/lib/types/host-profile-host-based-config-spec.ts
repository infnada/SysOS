import {HostProfileConfigSpec} from './host-profile-config-spec';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostProfileHostBasedConfigSpec extends HostProfileConfigSpec {
  host: ManagedObjectReference & { $type: 'HostSystem' };
  useHostProfileEngine?: boolean;
}
