import {DynamicData} from './dynamic-data';


export interface EventAlarmExpressionComparison extends DynamicData {
  attributeName: string;
  operator: string;
  value: string;
}