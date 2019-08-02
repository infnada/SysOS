import {DateTime} from "./date-time";
import {ProfileDeferredPolicyOptionParameter} from "./profile-deferred-policy-option-parameter";

export interface AnswerFile {
  createdTime: DateTime;
  modifiedTime: DateTime;
  userInput?: ProfileDeferredPolicyOptionParameter[];
}
