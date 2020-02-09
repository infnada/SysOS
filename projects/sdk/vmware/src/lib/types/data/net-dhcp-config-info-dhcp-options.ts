import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';

export interface NetDhcpConfigInfoDhcpOptions extends DynamicData {
  config?: KeyValue[];
  enable: boolean;
}