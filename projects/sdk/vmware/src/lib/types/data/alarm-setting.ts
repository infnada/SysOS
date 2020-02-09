import {DynamicData} from './dynamic-data';


export interface AlarmSetting extends DynamicData {
  reportingFrequency: number;
  toleranceRange: number;
}