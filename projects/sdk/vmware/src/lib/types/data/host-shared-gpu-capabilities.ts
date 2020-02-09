import {DynamicData} from './dynamic-data';


export interface HostSharedGpuCapabilities extends DynamicData {
  diskSnapshotSupported: boolean;
  memorySnapshotSupported: boolean;
  migrateSupported: boolean;
  suspendSupported: boolean;
  vgpu: string;
}