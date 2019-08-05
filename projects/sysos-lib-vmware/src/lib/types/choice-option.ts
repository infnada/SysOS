import {OptionType} from './option-type';

import {ElementDescription} from './element-description';
import {Int} from './int';
export interface ChoiceOption extends OptionType {
  choiceInfo: ElementDescription[];
  defaultIndex?: Int;
}
