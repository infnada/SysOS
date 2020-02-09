import {AnswerFileCreateSpec} from './answer-file-create-spec';

import {ProfileDeferredPolicyOptionParameter} from './profile-deferred-policy-option-parameter';

export interface AnswerFileOptionsCreateSpec extends AnswerFileCreateSpec {
  userInput?: ProfileDeferredPolicyOptionParameter[];
}