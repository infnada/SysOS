import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface HostSystemRemediationState extends DynamicData {
  operationTime: DateTime;
  state: string;
}
