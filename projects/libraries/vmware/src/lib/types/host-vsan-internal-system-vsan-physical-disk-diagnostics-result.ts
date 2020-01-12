import {DynamicData} from './dynamic-data';

export interface HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult extends DynamicData {
  diskUuid: string;
  failureReason?: string;
  success: boolean;
}
