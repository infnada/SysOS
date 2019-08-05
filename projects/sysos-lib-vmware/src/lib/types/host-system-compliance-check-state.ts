import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface HostSystemComplianceCheckState extends DynamicData {
  checkTime: DateTime;
  state: string;
}
