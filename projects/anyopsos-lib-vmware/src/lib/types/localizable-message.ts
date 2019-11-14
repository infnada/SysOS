import {DynamicData} from './dynamic-data';

import {KeyAnyValue} from './key-any-value';
export interface LocalizableMessage extends DynamicData {
  arg?: KeyAnyValue[];
  key: string;
  message?: string;
}
