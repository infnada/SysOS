import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';

export interface HttpNfcLeaseSourceFile extends DynamicData {
  create: boolean;
  httpHeaders?: KeyValue[];
  memberName?: string;
  size?: number;
  sslThumbprint?: string;
  targetDeviceId: string;
  url: string;
}