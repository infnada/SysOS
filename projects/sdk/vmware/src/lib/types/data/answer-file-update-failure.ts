import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ProfilePropertyPath} from './profile-property-path';

export interface AnswerFileUpdateFailure extends DynamicData {
  errMsg: LocalizableMessage;
  userInputPath: ProfilePropertyPath;
}