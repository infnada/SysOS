import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../types/vmware-object';

@Component({
  selector: 'saim-tab-configure',
  templateUrl: './tab-configure.component.html',
  styleUrls: ['./tab-configure.component.scss']
})
export class TabConfigureComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit() {
  }

}
