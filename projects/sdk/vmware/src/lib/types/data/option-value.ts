import {DynamicData} from './dynamic-data';


export interface OptionValue extends DynamicData {
  key: string;
  value?: any;
}