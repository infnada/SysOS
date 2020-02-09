import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';

export interface HostNumericSensorInfo extends DynamicData {
  baseUnits: string;
  currentReading: number;
  healthState?: ElementDescription;
  id?: string;
  name: string;
  rateUnits?: string;
  sensorType: string;
  timeStamp?: string;
  unitModifier: number;
}