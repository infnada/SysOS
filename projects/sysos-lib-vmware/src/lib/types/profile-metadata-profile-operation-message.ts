import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
export interface ProfileMetadataProfileOperationMessage extends DynamicData {
  message: LocalizableMessage;
  operationName: string;
}
