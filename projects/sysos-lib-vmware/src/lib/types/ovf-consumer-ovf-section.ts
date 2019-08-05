import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface OvfConsumerOvfSection extends DynamicData {
  lineNumber: Int;
  xml: string;
}
