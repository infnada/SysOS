import {Component, Input, AfterViewInit} from '@angular/core';

import {SysosLibExtNetdataService} from '@sysos/lib-ext-netdata';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../types/vmware-object';

@Component({
  selector: 'saim-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements AfterViewInit {
  @Input() vmwareObject: VMWareObject;

  connection;

  constructor(private NetdataService: SysosLibExtNetdataService,
              public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngAfterViewInit() {
    this.connection = this.NetdataService.getConnection(this.vmwareObject.info.data.mainUuid);

    // new this.NetdataService.Dashboard(this.jQuery.$, this.Dygraphs.Dygraph, this.gaugeJS.gaugeJS.Gauge, this.Ps.PerfectScrollbar);
    // this.NetdataService.setNetdataShowAlarms(false);
  }

  haveMonitor() {
    return this.VmwareTemplateHelpers.getObjectType(this.vmwareObject) === 'VirtualMachine' ||
      this.VmwareTemplateHelpers.getObjectType(this.vmwareObject) === 'VirtualMachine';
  }

}
