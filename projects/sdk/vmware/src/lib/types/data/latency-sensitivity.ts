import {DynamicData} from './dynamic-data';

import {LatencySensitivitySensitivityLevel} from '../enums/latency-sensitivity-sensitivity-level';

export interface LatencySensitivity extends DynamicData {
  level: LatencySensitivitySensitivityLevel;
  sensitivity?: number;
}