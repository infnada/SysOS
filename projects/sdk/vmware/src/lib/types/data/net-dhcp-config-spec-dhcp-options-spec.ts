import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';

export interface NetDhcpConfigSpecDhcpOptionsSpec extends DynamicData {
  config: KeyValue[];
  enable?: boolean;
  operation: string;
}