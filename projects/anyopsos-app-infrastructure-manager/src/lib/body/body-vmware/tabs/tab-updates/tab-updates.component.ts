import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-updates',
  templateUrl: './tab-updates.component.html',
  styleUrls: ['./tab-updates.component.scss']
})
export class TabUpdatesComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
