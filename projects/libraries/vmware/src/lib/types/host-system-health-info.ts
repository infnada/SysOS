import {DynamicData} from './dynamic-data';

import {HostNumericSensorInfo} from './host-numeric-sensor-info';
export interface HostSystemHealthInfo extends DynamicData {
  numericSensorInfo?: HostNumericSensorInfo[];
}
