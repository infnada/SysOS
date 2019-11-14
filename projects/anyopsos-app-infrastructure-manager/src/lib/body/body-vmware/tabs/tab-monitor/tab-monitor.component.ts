import {Component, Input, OnInit} from '@angular/core';

import {NetdataConnection} from '@anyopsos/lib-ext-netdata';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-monitor',
  templateUrl: './tab-monitor.component.html',
  styleUrls: ['./tab-monitor.component.scss']
})
export class TabMonitorComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;
  @Input() monitorConnection: NetdataConnection;

  constructor(private Applications: AnyOpsOSLibApplicationService,
              public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

  manageMonitors() {
    this.Applications.openApplication('monitor');
  }

}
