import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface CustomFieldValue extends DynamicData {
  key: Int;
}
