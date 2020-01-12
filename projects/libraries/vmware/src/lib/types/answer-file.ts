import {DynamicData} from './dynamic-data';

import {ProfileDeferredPolicyOptionParameter} from './profile-deferred-policy-option-parameter';
import {DateTime} from './date-time';
export interface AnswerFile extends DynamicData {
  createdTime: DateTime;
  modifiedTime: DateTime;
  userInput?: ProfileDeferredPolicyOptionParameter[];
}
