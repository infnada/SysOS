import {DynamicData} from './dynamic-data';


export interface CustomizationPassword extends DynamicData {
  plainText: boolean;
  value: string;
}