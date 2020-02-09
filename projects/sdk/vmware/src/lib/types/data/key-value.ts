import {DynamicData} from './dynamic-data';


export interface KeyValue extends DynamicData {
  key: string;
  value: string;
}