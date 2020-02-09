import {DynamicData} from './dynamic-data';

import {ProfileDeferredPolicyOptionParameter} from './profile-deferred-policy-option-parameter';

export interface AnswerFile extends DynamicData {
  createdTime: string;
  modifiedTime: string;
  userInput?: ProfileDeferredPolicyOptionParameter[];
}