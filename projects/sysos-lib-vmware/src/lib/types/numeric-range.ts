import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface NumericRange extends DynamicData {
  end: Int;
  start: Int;
}
