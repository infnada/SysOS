import {Component, Input, OnInit} from '@angular/core';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-updates',
  templateUrl: './tab-updates.component.html',
  styleUrls: ['./tab-updates.component.scss']
})
export class TabUpdatesComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
