import {FileInfo} from './file-info';

import {VmDiskFileEncryptionInfo} from './vm-disk-file-encryption-info';
import {Int} from './int';
import {Long} from './long';
export interface VmDiskFileInfo extends FileInfo {
  capacityKb?: Long;
  controllerType?: string;
  diskExtents?: string[];
  diskType?: string;
  encryption?: VmDiskFileEncryptionInfo;
  hardwareVersion?: Int;
  thin?: boolean;
}
