import {DvsFault} from './dvs-fault';

import {ConflictingConfigurationConfig} from '../data/conflicting-configuration-config';

export interface ConflictingConfiguration extends DvsFault {
  configInConflict: ConflictingConfigurationConfig[];
}