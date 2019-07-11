import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {SysosAppBackupsManagerService} from '../services/sysos-app-backups-manager.service';

@Component({
  selector: 'sabm-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() application: Application;

  viewSide: boolean = true;

  constructor(private BackupsManager: SysosAppBackupsManagerService) {
  }

  ngOnInit() {
    console.log(this.application);
    if (this.application.initData) {

      if (this.application.initData.type === 'mount_restore_datastore') this.BackupsManager.mountRestoreDatastore(this.application.initData.data);
      if (this.application.initData.type === 'restore_datastore_files') this.BackupsManager.restoreDatastoreFiles(this.application.initData.data);
      if (this.application.initData.type === 'restore_vm_guest_files') this.BackupsManager.restoreVmGuestFiles(this.application.initData.data);
      if (this.application.initData.type === 'vm_instant_recovery') this.BackupsManager.vmInstantRecovery(this.application.initData.data);
      if (this.application.initData.type === 'restore_vm') this.BackupsManager.restoreVm(this.application.initData.data);
      if (this.application.initData.type === 'backup_vm') this.BackupsManager.backupVm(this.application.initData.data);

    }
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }
}
