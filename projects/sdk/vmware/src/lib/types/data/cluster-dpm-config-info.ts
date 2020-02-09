import {DynamicData} from './dynamic-data';

import {DpmBehavior} from '../enums/dpm-behavior';
import {OptionValue} from './option-value';

export interface ClusterDpmConfigInfo extends DynamicData {
  defaultDpmBehavior?: DpmBehavior;
  enabled?: boolean;
  hostPowerActionRate?: number;
  option?: OptionValue[];
}