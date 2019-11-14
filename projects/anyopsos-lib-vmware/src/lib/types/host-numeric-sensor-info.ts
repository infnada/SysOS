import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
import {Int} from './int';
import {Long} from './long';
export interface HostNumericSensorInfo extends DynamicData {
  baseUnits: string;
  currentReading: Long;
  healthState?: ElementDescription;
  id?: string;
  name: string;
  rateUnits?: string;
  sensorType: string;
  timeStamp?: string;
  unitModifier: Int;
}
