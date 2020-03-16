import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppBackupsManagerService} from '../services/anyopsos-app-backups-manager.service';

@Component({
  selector: 'aabm-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  viewSide: boolean = true;

  constructor(private BackupsManager: AnyOpsOSAppBackupsManagerService) {
  }

  ngOnInit(): void {
    // Set bodyContainerRef, this is used by Modals
    this.BackupsManager.setBodyContainerRef(this.bodyContainer);

    console.log(this.application);
    if (this.application.initData) {

      if (this.application.initData.type === 'mount_volume_snapshot') this.BackupsManager.mountVolumeSnapshot(this.application.initData.data);
      if (this.application.initData.type === 'restore_volume_files') this.BackupsManager.restoreVolumeFiles(this.application.initData.data);
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
