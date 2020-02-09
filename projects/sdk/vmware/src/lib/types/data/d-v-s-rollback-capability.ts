import {DynamicData} from './dynamic-data';


export interface DVSRollbackCapability extends DynamicData {
  rollbackSupported: boolean;
}