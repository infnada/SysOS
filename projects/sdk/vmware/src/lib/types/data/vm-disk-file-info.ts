import {FileInfo} from './file-info';

import {VmDiskFileEncryptionInfo} from './vm-disk-file-encryption-info';

export interface VmDiskFileInfo extends FileInfo {
  capacityKb?: number;
  controllerType?: string;
  diskExtents?: string[];
  diskType?: string;
  encryption?: VmDiskFileEncryptionInfo;
  hardwareVersion?: number;
  thin?: boolean;
}