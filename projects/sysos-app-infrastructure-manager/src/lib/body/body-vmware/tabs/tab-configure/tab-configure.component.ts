import {Component, Input, OnInit} from '@angular/core';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-configure',
  templateUrl: './tab-configure.component.html',
  styleUrls: ['./tab-configure.component.scss']
})
export class TabConfigureComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
