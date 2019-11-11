import {Component, Input, OnInit} from '@angular/core';

import {NetdataConnection} from '@sysos/lib-ext-netdata';
import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-monitor',
  templateUrl: './tab-monitor.component.html',
  styleUrls: ['./tab-monitor.component.scss']
})
export class TabMonitorComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;
  @Input() monitorConnection: NetdataConnection;

  constructor(private Applications: SysosLibApplicationService,
              public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

  manageMonitors() {
    this.Applications.openApplication('monitor');
  }

}
