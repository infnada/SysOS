import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ProfilePropertyPath} from './profile-property-path';

export interface ProfileUpdateFailedUpdateFailure extends DynamicData {
  errMsg: LocalizableMessage;
  profilePath: ProfilePropertyPath;
}