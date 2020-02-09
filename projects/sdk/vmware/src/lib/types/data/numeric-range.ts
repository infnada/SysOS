import {DynamicData} from './dynamic-data';


export interface NumericRange extends DynamicData {
  end: number;
  start: number;
}