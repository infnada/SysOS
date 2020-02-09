import {IoFilterInfo} from './io-filter-info';


export interface ClusterIoFilterInfo extends IoFilterInfo {
  opType: string;
  vibUrl?: string;
}