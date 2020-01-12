import {DynamicData} from './dynamic-data';

import {LatencySensitivitySensitivityLevel} from './latency-sensitivity-sensitivity-level';
import {Int} from './int';
export interface LatencySensitivity extends DynamicData {
  level: LatencySensitivitySensitivityLevel;
  sensitivity?: Int;
}
