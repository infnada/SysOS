import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../../../types/im-data-object';

@Component({
  selector: 'saim-tab-alarms',
  templateUrl: './tab-alarms.component.html',
  styleUrls: ['./tab-alarms.component.scss']
})
export class TabAlarmsComponent implements OnInit {
  @Input() nmObject: ImDataObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
