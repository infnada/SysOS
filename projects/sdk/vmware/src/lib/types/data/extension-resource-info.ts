import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';

export interface ExtensionResourceInfo extends DynamicData {
  data: KeyValue[];
  locale: string;
  module: string;
}