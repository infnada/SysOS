import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatSort, MatTableDataSource} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibVmwareService, TaskInfo} from '@anyopsos/lib-vmware';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';

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
  viewRecentTasks: boolean = true;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Modal: AnyOpsOSLibModalService,
              private VMWare: AnyOpsOSLibVmwareService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {

  }

  ngOnInit() {
    this.Modal.openLittleModal('PLEASE WAIT', 'Getting VMware Tasks...', '.vmware-tasks', 'plain').then(() => {

      return this.VMWare.connectvCenterSoap(this.InfrastructureManager.getActiveConnection(true));
    }).then((data) => {
      if (data.status === 'error') throw new Error('Failed to connect to vCenter');

      const date = new Date();
      date.setHours(date.getHours() - 2);

      return this.VMWare.CreateCollectorForTasks(
        this.InfrastructureManager.getActiveConnection(true),
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
        this.InfrastructureManager.getActiveConnection(true),
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
        this.Modal.changeModalText((e.description ? e.description : e.message), '.vmware-tasks');
      }

      throw e;
    });
  }

}



