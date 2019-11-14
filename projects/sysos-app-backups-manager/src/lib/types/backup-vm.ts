import {ImDataObject, VMWareVM} from '@sysos/app-infrastructure-manager';

export interface BackupVm {
  vm: ImDataObject & { info: { data: VMWareVM } };
  uuid?: string;
  backupName?: string;
}
