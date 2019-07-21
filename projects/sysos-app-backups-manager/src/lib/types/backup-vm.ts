import {VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface BackupVm {
  vm: VMWareObject & { info: { data: VMWareVM } };
  uuid?: string;
  backupName?: string;
}
