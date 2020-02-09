import {DynamicData} from './dynamic-data';

import {DrsBehavior} from '../enums/drs-behavior';
import {OptionValue} from './option-value';

export interface ClusterDrsConfigInfo extends DynamicData {
  defaultVmBehavior?: DrsBehavior;
  enabled?: boolean;
  enableVmBehaviorOverrides?: boolean;
  option?: OptionValue[];
  vmotionRate?: number;
}