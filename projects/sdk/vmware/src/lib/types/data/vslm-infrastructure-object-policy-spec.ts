import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface vslmInfrastructureObjectPolicySpec extends DynamicData {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  profile?: VirtualMachineProfileSpec[];
}