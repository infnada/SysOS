import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';

export interface UpdateVirtualMachineFilesResultFailedVmFileInfo extends DynamicData {
  fault: LocalizedMethodFault;
  vmFile: string;
}