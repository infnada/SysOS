import {DynamicData} from './dynamic-data';


export interface FaultToleranceConfigInfo extends DynamicData {
  configPaths: string[];
  instanceUuids: string[];
  orphaned?: boolean;
  role: number;
}