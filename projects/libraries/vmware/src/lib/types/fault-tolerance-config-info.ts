import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface FaultToleranceConfigInfo extends DynamicData {
  configPaths: string[];
  instanceUuids: string[];
  orphaned?: boolean;
  role: Int;
}
