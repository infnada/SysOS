import {DynamicData} from './dynamic-data';


export interface VsanHostClusterStatusStateCompletionEstimate extends DynamicData {
  completeTime?: string;
  percentComplete?: number;
}