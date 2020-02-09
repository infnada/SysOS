import {ElementDescription} from './element-description';

import {KeyAnyValue} from './key-any-value';

export interface ExtendedElementDescription extends ElementDescription {
  messageArg?: KeyAnyValue[];
  messageCatalogKeyPrefix: string;
}