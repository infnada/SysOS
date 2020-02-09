import {OptionType} from './option-type';

import {ElementDescription} from './element-description';

export interface ChoiceOption extends OptionType {
  choiceInfo: ElementDescription[];
  defaultIndex?: number;
}