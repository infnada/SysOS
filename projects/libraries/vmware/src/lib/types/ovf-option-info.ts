import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
export interface OvfOptionInfo extends DynamicData {
  description: LocalizableMessage;
  option: string;
}
