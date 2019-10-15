import {Component, Input, OnInit} from '@angular/core';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-alarms',
  templateUrl: './tab-alarms.component.html',
  styleUrls: ['./tab-alarms.component.scss']
})
export class TabAlarmsComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
