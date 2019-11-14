import {OptionType} from './option-type';
import {Long} from './long';

export interface LongOption extends OptionType {
  defaultValue: Long;
  max: Long;
  min: Long;
}
