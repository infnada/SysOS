import {DynamicData} from './dynamic-data';

import {KeyAnyValue} from './key-any-value';
export interface PolicyOption extends DynamicData {
  id: string;
  parameter?: KeyAnyValue[];
}
