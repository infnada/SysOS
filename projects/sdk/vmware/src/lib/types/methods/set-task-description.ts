import {ManagedObjectReference} from '../data/managed-object-reference';
import {LocalizableMessage} from '../data/localizable-message';


export interface SetTaskDescription {
  _this: ManagedObjectReference;
  description: LocalizableMessage;
}