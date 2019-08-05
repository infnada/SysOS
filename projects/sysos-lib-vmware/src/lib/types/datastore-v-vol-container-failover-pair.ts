import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';
export interface DatastoreVVolContainerFailoverPair extends DynamicData {
  srcContainer?: string;
  tgtContainer: string;
  vvolMapping?: KeyValue[];
}
