import {DynamicData} from './dynamic-data';


export interface OvfConsumerOvfSection extends DynamicData {
  lineNumber: number;
  xml: string;
}