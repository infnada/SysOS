import {ProfileSerializedCreateSpec} from './profile-serialized-create-spec';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostProfileSerializedHostProfileSpec extends ProfileSerializedCreateSpec {
  validating?: boolean;
  validatorHost?: ManagedObjectReference & { $type: 'HostSystem'; };
}