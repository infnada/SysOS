import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibExtNetdataService, NetdataConnection} from '@anyopsos/lib-ext-netdata';

import {ImDataObject} from '../../types/im-data-object';
import {AnyOpsOSAppInfrastructureManagerTemplateHelperService} from '../../services/anyopsos-app-infrastructure-manager-template-helper.service';
import {AnyOpsOSAppInfrastructureManagerNodeMonitorService} from '../../services/anyopsos-app-infrastructure-manager-node-monitor.service';

@Component({
  selector: 'saim-body-vmware',
  templateUrl: './body-vmware.component.html',
  styleUrls: ['./body-vmware.component.scss']
})
export class BodyVmwareComponent implements OnChanges {
  @Input() vmwareObject: ImDataObject;
  @Input() application: Application;

  private Monitor;

  monitorConnection: NetdataConnection;

  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Netdata: AnyOpsOSLibExtNetdataService,
              private InfrastructureManagerNodeMonitor: AnyOpsOSAppInfrastructureManagerNodeMonitorService,
              public InfrastructureManagerTemplateHelper: AnyOpsOSAppInfrastructureManagerTemplateHelperService) {

    this.Monitor = this.serviceInjector.get('AnyOpsOSAppMonitorService');
  }

  ngOnChanges(changes: SimpleChanges) {

    // Reset old Netdata Dashboard
    // TODO if old dashboard is active on Monitor Application, it will be reseated as well
    if (this.monitorConnection) {
      this.monitorConnection = undefined;
      this.Netdata.resetDashboard(changes.vmwareObject.previousValue);
    }

    // Set Netdata Monitor Dashboard
    if (this.haveMonitor) {
      const linkToMonitor = this.Monitor.getConnectionByLink(this.vmwareObject.info.uuid);
      if (linkToMonitor) this.monitorConnection = this.Netdata.newDashboard(linkToMonitor);
    }
  }

  haveMonitor(): boolean {
    return this.InfrastructureManagerNodeMonitor.haveMonitor(this.vmwareObject);
  }

}
