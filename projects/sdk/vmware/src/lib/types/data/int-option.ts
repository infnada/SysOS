import {OptionType} from './option-type';


export interface IntOption extends OptionType {
  defaultValue: number;
  max: number;
  min: number;
}