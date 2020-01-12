import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../../../types/im-data-object';

@Component({
  selector: 'aaim-tab-configure',
  templateUrl: './tab-configure.component.html',
  styleUrls: ['./tab-configure.component.scss']
})
export class TabConfigureComponent implements OnInit {
  @Input() nmObject: ImDataObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit(): void {
  }

}
