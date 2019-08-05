import {DynamicData} from './dynamic-data';

import {DpmBehavior} from './dpm-behavior';
import {OptionValue} from './option-value';
import {Int} from './int';
export interface ClusterDpmConfigInfo extends DynamicData {
  defaultDpmBehavior?: DpmBehavior;
  enabled?: boolean;
  hostPowerActionRate?: Int;
  option?: OptionValue[];
}
