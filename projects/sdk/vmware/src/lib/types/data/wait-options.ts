import {DynamicData} from './dynamic-data';


export interface WaitOptions extends DynamicData {
  maxObjectUpdates?: number;
  maxWaitSeconds?: number;
}