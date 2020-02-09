import {BaseConfigInfoFileBackingInfo} from './base-config-info-file-backing-info';


export interface BaseConfigInfoRawDiskMappingBackingInfo extends BaseConfigInfoFileBackingInfo {
  compatibilityMode: string;
  lunUuid: string;
}