import {OptionType} from './option-type';


export interface LongOption extends OptionType {
  defaultValue: number;
  max: number;
  min: number;
}