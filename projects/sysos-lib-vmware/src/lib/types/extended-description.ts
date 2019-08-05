import {Description} from './description';

import {KeyAnyValue} from './key-any-value';
export interface ExtendedDescription extends Description {
  messageArg?: KeyAnyValue[];
  messageCatalogKeyPrefix: string;
}
