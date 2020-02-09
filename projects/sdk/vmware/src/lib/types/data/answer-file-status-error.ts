import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ProfilePropertyPath} from './profile-property-path';

export interface AnswerFileStatusError extends DynamicData {
  errMsg: LocalizableMessage;
  userInputPath: ProfilePropertyPath;
}