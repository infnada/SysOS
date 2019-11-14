import {OptionType} from './option-type';
import {Float} from './float';

export interface FloatOption extends OptionType {
  defaultValue: Float;
  max: Float;
  min: Float;
}
