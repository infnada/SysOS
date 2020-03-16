import {VMWareVM} from '@anyopsos/module-node-vmware';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

export interface BackupVm {
  vm: DataObject & { info: { data: VMWareVM } };
  uuid?: string;
  backupName?: string;
}
