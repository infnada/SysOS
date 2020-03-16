import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {MatDialogRef, MatSort, MatTableDataSource} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibNodeVmwareSoapApiService} from '@anyopsos/lib-node-vmware';
import {ConnectionVmware} from '@anyopsos/module-node-vmware';
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
              private readonly LibNodeVmwareSoapApiService: AnyOpsOSLibNodeVmwareSoapApiService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {

  }

  async ngOnInit(): Promise<void> {
    const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(this.InfrastructureManager.getBodyContainerRef(), 'PLEASE WAIT', 'Getting VMware Tasks...');

    const currentConnection: ConnectionVmware = this.InfrastructureManager.getActiveConnection() as ConnectionVmware;

    const date = new Date();
    date.setHours(date.getHours() - 2);

    // @ts-ignore TODO
    return this.LibNodeVmwareSoapApiService.callSoapApi(currentConnection.uuid, 'CreateCollectorForTasks', {
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
    }).then(async (createCollectorResult) => {
      if (createCollectorResult.status === 'error') throw new Error('Failed to CreateCollectorForTasks to vCenter');

      const currentConnection: ConnectionVmware = this.InfrastructureManager.getActiveConnection() as ConnectionVmware;

      return this.LibNodeVmwareSoapApiService.callSoapApi(currentConnection.uuid, 'ReadNextTasks', {
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

      this.LibModal.closeModal(littleModalRef.id);
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMware Tasks data', null, e.description);

      if (littleModalRef && this.LibModal.isModalOpened(littleModalRef.id)) {
        this.LibModal.changeModalType(littleModalRef.id, 'danger');
        this.LibModal.changeModalText(littleModalRef.id, (e.description ? e.description : e.message));
      }

      throw e;
    });
  }

}



