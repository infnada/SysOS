import {ElementDescription} from './element-description';

import {OptionType} from './option-type';

export interface OptionDef extends ElementDescription {
  optionType: OptionType;
}