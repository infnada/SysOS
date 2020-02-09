import {VslmMigrateSpec} from './vslm-migrate-spec';

import {KeyValue} from './key-value';

export interface VslmCloneSpec extends VslmMigrateSpec {
  keepAfterDeleteVm?: boolean;
  metadata?: KeyValue[];
  name: string;
}