import {BaseConfigInfoFileBackingInfo} from './base-config-info-file-backing-info';

export interface BaseConfigInfoDiskFileBackingInfo extends BaseConfigInfoFileBackingInfo {
  provisioningType: string;
}
