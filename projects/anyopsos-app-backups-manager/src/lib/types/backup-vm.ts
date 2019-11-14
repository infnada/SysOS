import {ImDataObject, VMWareVM} from '@anyopsos/app-infrastructure-manager';

export interface BackupVm {
  vm: ImDataObject & { info: { data: VMWareVM } };
  uuid?: string;
  backupName?: string;
}
