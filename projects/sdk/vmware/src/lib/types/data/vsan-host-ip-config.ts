import {DynamicData} from './dynamic-data';


export interface VsanHostIpConfig extends DynamicData {
  downstreamIpAddress: string;
  upstreamIpAddress: string;
}