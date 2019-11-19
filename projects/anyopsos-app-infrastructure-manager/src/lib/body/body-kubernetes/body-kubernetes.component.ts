import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibExtNetdataService, NetdataConnection} from '@anyopsos/lib-ext-netdata';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../types/im-data-object';

@Component({
  selector: 'saim-body-kubernetes',
  templateUrl: './body-kubernetes.component.html',
  styleUrls: ['./body-kubernetes.component.scss']
})
export class BodyKubernetesComponent implements OnChanges {
  @Input() kubernetesObject: ImDataObject;
  @Input() application: Application;

  private Monitor;

  monitorConnection: NetdataConnection;

  constructor(private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Netdata: AnyOpsOSLibExtNetdataService,
              public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {

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
      const linkToMonitor = this.Monitor.getConnectionByLink(this.kubernetesObject.info.uuid);
      if (linkToMonitor) this.monitorConnection = this.Netdata.newDashboard(linkToMonitor);
    }
  }

  haveMonitor() {
    return this.kubernetesObject.type === 'Pod';
  }

}
