import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../../../types/im-data-object';

@Component({
  selector: 'aaim-tab-updates',
  templateUrl: './tab-updates.component.html',
  styleUrls: ['./tab-updates.component.scss']
})
export class TabUpdatesComponent implements OnInit {
  @Input() nmObject: ImDataObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) {
  }

  ngOnInit(): void {
  }

}
