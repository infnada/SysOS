import {LocalizableMessage} from "./localizable-message";
import {ProfilePropertyPath} from "./profile-property-path";

export interface ProfileExecuteError {
  message: LocalizableMessage;
  path?: ProfilePropertyPath;
}
