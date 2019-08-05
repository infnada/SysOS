import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {OvfFileItem} from './ovf-file-item';
import {ImportSpec} from './import-spec';
export interface OvfCreateImportSpecResult extends DynamicData {
  error?: LocalizedMethodFault[];
  fileItem?: OvfFileItem[];
  importSpec?: ImportSpec;
  warning?: LocalizedMethodFault[];
}
