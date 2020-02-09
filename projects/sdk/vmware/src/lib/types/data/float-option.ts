import {OptionType} from './option-type';


export interface FloatOption extends OptionType {
  defaultValue: number;
  max: number;
  min: number;
}