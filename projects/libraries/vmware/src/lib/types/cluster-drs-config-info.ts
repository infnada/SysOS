import {DynamicData} from './dynamic-data';

import {DrsBehavior} from './drs-behavior';
import {OptionValue} from './option-value';
import {Int} from './int';
export interface ClusterDrsConfigInfo extends DynamicData {
  defaultVmBehavior?: DrsBehavior;
  enabled?: boolean;
  enableVmBehaviorOverrides?: boolean;
  option?: OptionValue[];
  vmotionRate?: Int;
}
