import {LocalizableMessage} from "./localizable-message";
import {ProfilePropertyPath} from "./profile-property-path";

export interface AnswerFileStatusError {
  errMsg: LocalizableMessage;
  userInputPath: ProfilePropertyPath;
}
