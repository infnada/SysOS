import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
import {HostSnmpDestination} from './host-snmp-destination';

export interface HostSnmpConfigSpec extends DynamicData {
  enabled?: boolean;
  option?: KeyValue[];
  port?: number;
  readOnlyCommunities?: string[];
  trapTargets?: HostSnmpDestination[];
}