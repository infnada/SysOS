import {DynamicData} from './dynamic-data';

import {ExtendedElementDescription} from './extended-element-description';
import {LocalizableMessage} from './localizable-message';

export interface ProfileDescriptionSection extends DynamicData {
  description: ExtendedElementDescription;
  message?: LocalizableMessage[];
}