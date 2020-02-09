import {DynamicData} from './dynamic-data';


export interface HostTpmEventDetails extends DynamicData {
  dataHash: number[];
  dataHashMethod?: string;
}