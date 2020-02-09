import {OptionType} from './option-type';


export interface StringOption extends OptionType {
  defaultValue: string;
  validCharacters?: string;
}