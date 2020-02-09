import {DynamicData} from './dynamic-data';


export interface VsanHostVsanDiskInfo extends DynamicData {
  formatVersion: number;
  vsanUuid: string;
}