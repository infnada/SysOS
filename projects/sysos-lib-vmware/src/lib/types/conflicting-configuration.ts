import {DvsFault} from './dvs-fault';

import {ConflictingConfigurationConfig} from './conflicting-configuration-config';
export interface ConflictingConfiguration extends DvsFault {
  configInConflict: ConflictingConfigurationConfig[];
}
