import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import {SysosLibExtNetdataService, NetdataConnection} from '@sysos/lib-ext-netdata';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../types/vmware-object';

@Component({
  selector: 'saim-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnChanges {
  @Input() vmwareObject: VMWareObject;

  private Monitor;

  monitorConnection: NetdataConnection;

  constructor(private serviceInjector: SysosLibServiceInjectorService,
              private Netdata: SysosLibExtNetdataService,
              public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {

    this.Monitor = this.serviceInjector.get('SysosAppMonitorService');
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

  haveMonitor() {
    return this.VmwareTemplateHelpers.getObjectType(this.vmwareObject) === 'VirtualMachine';
  }

}
