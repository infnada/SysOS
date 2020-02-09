import {FileInfo} from './file-info';

import {VmConfigFileEncryptionInfo} from './vm-config-file-encryption-info';

export interface VmConfigFileInfo extends FileInfo {
  configVersion?: number;
  encryption?: VmConfigFileEncryptionInfo;
}