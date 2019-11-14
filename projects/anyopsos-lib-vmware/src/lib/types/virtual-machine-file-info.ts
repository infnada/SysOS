import {DynamicData} from './dynamic-data';

export interface VirtualMachineFileInfo extends DynamicData {
  ftMetadataDirectory?: string;
  logDirectory?: string;
  snapshotDirectory?: string;
  suspendDirectory?: string;
  vmPathName?: string;
}
