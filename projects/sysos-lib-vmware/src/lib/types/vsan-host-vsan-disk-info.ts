import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VsanHostVsanDiskInfo extends DynamicData {
  formatVersion: Int;
  vsanUuid: string;
}
