import {Component, Input, OnInit} from '@angular/core';

import {NetdataConnection} from '@anyopsos/ext-lib-netdata';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../../../types/im-data-object';

@Component({
  selector: 'aaim-tab-monitor',
  templateUrl: './tab-monitor.component.html',
  styleUrls: ['./tab-monitor.component.scss']
})
export class TabMonitorComponent implements OnInit {
  @Input() nmObject: ImDataObject;
  @Input() monitorConnection: NetdataConnection;

  constructor(private Applications: AnyOpsOSLibApplicationService,
              public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit(): void {
  }

  manageMonitors() {
    this.Applications.openApplication('monitor');
  }

}
