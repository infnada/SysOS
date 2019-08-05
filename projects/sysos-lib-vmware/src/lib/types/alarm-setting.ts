import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface AlarmSetting extends DynamicData {
  reportingFrequency: Int;
  toleranceRange: Int;
}
