import {OptionType} from './option-type';
import {Int} from './int';

export interface IntOption extends OptionType {
  defaultValue: Int;
  max: Int;
  min: Int;
}
