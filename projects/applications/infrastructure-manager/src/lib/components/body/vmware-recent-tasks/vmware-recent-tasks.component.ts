import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatSort, MatTableDataSource} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibVmwareSoapApiService} from '@anyopsos/lib-vmware';
import {ConnectionVmware} from '@anyopsos/module-vmware';
import {TaskInfo} from '@anyopsos/sdk-vmware/src/lib/types/data/task-info';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../services/anyopsos-app-infrastructure-manager.service';

@Component({
  selector: 'aaim-vmware-recent-tasks',
  templateUrl: './vmware-recent-tasks.component.html',
  styleUrls: ['./vmware-recent-tasks.component.scss']
})
export class VmwareRecentTasksComponent implements OnInit {
  @Input() application: Application;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['taskName', 'target', 'status', 'initiator', 'queuedFor', 'startTime', 'completionTime', 'server'];
  dataSource: MatTableDataSource<TaskInfo>;
  viewRecentTasks: boolean = true;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibVmwareSoapApiService: AnyOpsOSLibVmwareSoapApiService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {

  }

  ngOnInit(): void {
    this.LibModal.openLittleModal('PLEASE WAIT', 'Getting VMware Tasks...', '.vmware-tasks', 'plain').then(async () => {

      const currentConnection: ConnectionVmware = await this.InfrastructureManager.getActiveConnection() as ConnectionVmware;

      const date = new Date();
      date.setHours(date.getHours() - 2);

      return this.LibVmwareSoapApiService.callSoapApi(currentConnection.uuid, 'CreateCollectorForTasks', {
        _this: {
          $type: 'TaskManager',
          _value: 'TaskManager'
        },
        filter: {
          time: {
            timeType: 'queuedTime',
            beginTime: date.toISOString()
          }
        }
      });

    }).then(async (createCollectorResult) => {
      if (createCollectorResult.status === 'error') throw new Error('Failed to CreateCollectorForTasks to vCenter');

      const currentConnection: ConnectionVmware = await this.InfrastructureManager.getActiveConnection() as ConnectionVmware;

      return this.LibVmwareSoapApiService.callSoapApi(currentConnection.uuid, 'ReadNextTasks', {
        _this: {
          $type: 'TaskHistoryCollector',
          _value: createCollectorResult.data.name
        },
        maxCount: 100
      });

    }).then((ReadNextTasksResult) => {
      if (ReadNextTasksResult.status === 'error') throw new Error('Failed to ReadNextTasks to vCenter');

      console.log(ReadNextTasksResult);
      this.dataSource = new MatTableDataSource(ReadNextTasksResult.data);
      this.dataSource.sort = this.sort;

      this.LibModal.closeModal('.vmware-tasks');
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMware Tasks data', null, e.description);

      if (this.LibModal.isModalOpened('.vmware-tasks')) {
        this.LibModal.changeModalType('danger', '.vmware-tasks');
        this.LibModal.changeModalText((e.description ? e.description : e.message), '.vmware-tasks');
      }

      throw e;
    });
  }

}



