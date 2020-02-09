import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ProfilePropertyPath} from './profile-property-path';

export interface ProfileExecuteError extends DynamicData {
  message: LocalizableMessage;
  path?: ProfilePropertyPath;
}