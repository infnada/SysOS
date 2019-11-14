import {BaseConfigInfoBackingInfo} from './base-config-info-backing-info';

import {BaseConfigInfoFileBackingInfo} from './base-config-info-file-backing-info';
import {Long} from './long';
export interface BaseConfigInfoFileBackingInfo extends BaseConfigInfoBackingInfo {
  backingObjectId?: string;
  deltaSizeInMB?: Long;
  filePath: string;
  parent?: BaseConfigInfoFileBackingInfo;
}
