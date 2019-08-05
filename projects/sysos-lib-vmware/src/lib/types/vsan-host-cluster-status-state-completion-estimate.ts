import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface VsanHostClusterStatusStateCompletionEstimate extends DynamicData {
  completeTime?: DateTime;
  percentComplete?: Int;
}
