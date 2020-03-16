import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibNodeTemplateHelpersService} from '@anyopsos/lib-node';
import {AnyOpsOSExtLibNetdataService, NetdataConnection} from '@anyopsos/ext-lib-netdata';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-body-linux',
  templateUrl: './body-linux.component.html',
  styleUrls: ['./body-linux.component.scss']
})
export class BodyLinuxComponent implements OnChanges {
  @Input() linuxObject: DataObject;
  @Input() application: Application;

  private Monitor;

  monitorConnection: NetdataConnection;

  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Netdata: AnyOpsOSExtLibNetdataService,
              public readonly LibNodeTemplateHelpers: AnyOpsOSLibNodeTemplateHelpersService) {

    this.Monitor = this.serviceInjector.get('AnyOpsOSAppMonitorService');
  }

  ngOnChanges(changes: SimpleChanges) {

    // Reset old Netdata Dashboard
    // TODO if old dashboard is active on Monitor Application, it will be reseated as well
    if (this.monitorConnection) {
      this.monitorConnection = undefined;
      this.Netdata.resetDashboard(changes.netappObject.previousValue);
    }

    // Set Netdata Monitor Dashboard
    if (this.haveMonitor) {
      const linkToMonitor = this.Monitor.getConnectionByLink(this.linuxObject.info.uuid);
      if (linkToMonitor) this.monitorConnection = this.Netdata.newDashboard(linkToMonitor);
    }
  }

  haveMonitor() {
    return this.linuxObject.type === 'Container';
  }

}
