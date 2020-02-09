import {OptionType} from './option-type';


export interface BoolOption extends OptionType {
  defaultValue: boolean;
  supported: boolean;
}