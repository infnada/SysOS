import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {SysosLibLoggerService} from '@sysos/lib-logger';

import {Application} from '@sysos/lib-application';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService, TaskInfo} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from '../../services/sysos-app-infrastructure-manager.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'saim-vmware-recent-tasks',
  templateUrl: './vmware-recent-tasks.component.html',
  styleUrls: ['./vmware-recent-tasks.component.scss']
})
export class VmwareRecentTasksComponent implements OnInit {
  @Input() application: Application;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['taskName', 'target', 'status', 'initiator', 'queuedFor', 'startTime', 'completionTime', 'server'];
  dataSource: MatTableDataSource<TaskInfo>;
  activeConnection: string;
  viewRecentTasks: boolean = true;

  constructor(private logger: SysosLibLoggerService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {

  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);

    this.Modal.openLittleModal('PLEASE WAIT', 'Getting VMware Tasks...', '.vmware-tasks', 'plain').then(() => {

      return this.VMWare.connectvCenterSoap(this.InfrastructureManager.getConnectionByUuid(this.activeConnection));
    }).then((data) => {
      if (data.status === 'error') throw new Error('Failed to connect to vCenter');

      const date = new Date();
      date.setHours(date.getHours() - 2);

      return this.VMWare.CreateCollectorForTasks(
        this.InfrastructureManager.getConnectionByUuid(this.activeConnection),
        {
          time: {
            timeType: 'queuedTime',
            beginTime: date.toISOString()
          }
        }
      );

    }).then((createCollectorResult) => {
      if (createCollectorResult.status === 'error') throw new Error('Failed to CreateCollectorForTasks to vCenter');

      return this.VMWare.ReadNextTasks(
        this.InfrastructureManager.getConnectionByUuid(this.activeConnection),
        { $type: 'TaskHistoryCollector', _value: createCollectorResult.data.name },
        100
      );

    }).then((ReadNextTasksResult) => {
      if (ReadNextTasksResult.status === 'error') throw new Error('Failed to ReadNextTasks to vCenter');

      console.log(ReadNextTasksResult);
      this.dataSource = new MatTableDataSource(ReadNextTasksResult.data);
      this.dataSource.sort = this.sort;

      this.Modal.closeModal('.vmware-tasks');
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMware Tasks data', null, e.description);

      if (this.Modal.isModalOpened('.vmware-tasks')) {
        this.Modal.changeModalType('danger', '.vmware-tasks');
        this.Modal.changeModalText(e.description, '.vmware-tasks');
      }

      throw e;
    });
  }

}



