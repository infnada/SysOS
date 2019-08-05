import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
import {Long} from './long';
export interface HttpNfcLeaseSourceFile extends DynamicData {
  create: boolean;
  httpHeaders?: KeyValue[];
  memberName?: string;
  size?: Long;
  sslThumbprint?: string;
  targetDeviceId: string;
  url: string;
}
