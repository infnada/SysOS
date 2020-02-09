import {BaseConfigInfoBackingInfo} from './base-config-info-backing-info';


export interface BaseConfigInfoFileBackingInfo extends BaseConfigInfoBackingInfo {
  backingObjectId?: string;
  deltaSizeInMB?: number;
  filePath: string;
  parent?: BaseConfigInfoFileBackingInfo;
}