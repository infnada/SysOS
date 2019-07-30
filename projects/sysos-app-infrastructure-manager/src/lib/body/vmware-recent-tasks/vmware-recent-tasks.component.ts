import {Component, Input, OnInit} from '@angular/core';

import {Application} from "@sysos/lib-application";
import {SysosLibVmwareService} from "@sysos/lib-vmware";

import {SysosAppInfrastructureManagerService} from "../../services/sysos-app-infrastructure-manager.service";

@Component({
  selector: 'saim-vmware-recent-tasks',
  templateUrl: './vmware-recent-tasks.component.html',
  styleUrls: ['./vmware-recent-tasks.component.scss']
})
export class VmwareRecentTasksComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  viewRecentTasks: boolean = true;
  recentTasks: {
    name: string;
    target: {
      name: string;
    };
    status: {
      detail: string;
    };
    initiator: string;
    queuedFor: string;
    startTime: string;
    completionTime: string;
    server: {
      name: string;
    };
  }[];

  constructor(private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {

  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);

    return this.VMWare.connectvCenterSoap(this.InfrastructureManager.getConnectionByUuid(this.activeConnection)).then((data) => {
      if (data.status === 'error') throw new Error('Failed to connect to vCenter');

      return this.VMWare.CreateCollectorForTasks(
        this.InfrastructureManager.getConnectionByUuid(this.activeConnection),
        {}
      );

    }).then((createCollectorResult) => {
      if (createCollectorResult.status === 'error') throw new Error('Failed to CreateCollectorForTasks to vCenter');

      console.log(createCollectorResult);

      return this.VMWare.ReadNextTasks(
        this.InfrastructureManager.getConnectionByUuid(this.activeConnection),
        { $type: 'TaskHistoryCollector', _value: createCollectorResult.data.name },
        10
      );

    }).then((ReadNextTasksResult) => {
      if (ReadNextTasksResult.status === 'error') throw new Error('Failed to ReadNextTasks to vCenter');

      console.log(ReadNextTasksResult);
    });
  }

}



