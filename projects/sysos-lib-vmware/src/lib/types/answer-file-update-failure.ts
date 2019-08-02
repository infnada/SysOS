import {LocalizableMessage} from "./localizable-message";
import {ProfilePropertyPath} from "./profile-property-path";

export interface AnswerFileUpdateFailure {
  errMsg: LocalizableMessage;
  userInputPath: ProfilePropertyPath;
}
