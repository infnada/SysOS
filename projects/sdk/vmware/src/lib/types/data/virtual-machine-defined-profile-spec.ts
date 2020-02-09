import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

import {VirtualMachineProfileRawData} from './virtual-machine-profile-raw-data';
import {KeyValue} from './key-value';
import {ReplicationSpec} from './replication-spec';

export interface VirtualMachineDefinedProfileSpec extends VirtualMachineProfileSpec {
  profileData?: VirtualMachineProfileRawData;
  profileId: string;
  profileParams?: KeyValue[];
  replicationSpec?: ReplicationSpec;
}