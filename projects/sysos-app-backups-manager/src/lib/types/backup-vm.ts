import {VMWareObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface BackupVm {
  vm: VMWareObject & { data: VMWareVM };
  uuid?: string;
  backupName?: string;
}
