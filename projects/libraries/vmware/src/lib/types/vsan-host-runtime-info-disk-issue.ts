import {DynamicData} from './dynamic-data';

export interface VsanHostRuntimeInfoDiskIssue extends DynamicData {
  diskId: string;
  issue: string;
}
