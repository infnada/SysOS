import {DynamicData} from './dynamic-data';


export interface DistributedVirtualSwitchKeyedOpaqueBlob extends DynamicData {
  key: string;
  opaqueData: string;
}