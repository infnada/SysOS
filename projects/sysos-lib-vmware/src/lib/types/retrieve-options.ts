import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface RetrieveOptions extends DynamicData {
  maxObjects?: Int;
}
