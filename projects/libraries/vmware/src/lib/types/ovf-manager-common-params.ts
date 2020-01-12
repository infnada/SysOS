import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
export interface OvfManagerCommonParams extends DynamicData {
  deploymentOption: string;
  importOption?: string[];
  locale: string;
  msgBundle?: KeyValue[];
}
