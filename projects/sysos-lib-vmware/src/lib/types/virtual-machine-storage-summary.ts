import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';
import {Long} from './long';

export interface VirtualMachineStorageSummary extends DynamicData {
  committed: Long;
  timestamp: DateTime;
  uncommitted: Long;
  unshared: Long;
}
