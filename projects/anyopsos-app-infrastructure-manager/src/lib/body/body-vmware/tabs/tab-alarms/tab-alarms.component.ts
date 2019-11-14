import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-alarms',
  templateUrl: './tab-alarms.component.html',
  styleUrls: ['./tab-alarms.component.scss']
})
export class TabAlarmsComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
