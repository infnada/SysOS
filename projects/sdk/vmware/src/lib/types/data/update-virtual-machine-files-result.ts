import {DynamicData} from './dynamic-data';

import {UpdateVirtualMachineFilesResultFailedVmFileInfo} from './update-virtual-machine-files-result-failed-vm-file-info';

export interface UpdateVirtualMachineFilesResult extends DynamicData {
  failedVmFile?: UpdateVirtualMachineFilesResultFailedVmFileInfo[];
}