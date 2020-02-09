import {DynamicData} from './dynamic-data';


export interface NvdimmInterleaveSetInfo extends DynamicData {
  availableSize: number;
  baseAddress: number;
  deviceList?: number[];
  rangeType: string;
  setId: number;
  size: number;
  state: string;
}