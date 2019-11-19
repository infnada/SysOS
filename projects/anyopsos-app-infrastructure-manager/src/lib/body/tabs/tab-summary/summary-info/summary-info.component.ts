import {Component, Input, OnInit} from '@angular/core';

import {AnyOpsOSAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/anyopsos-app-infrastructure-vmware-template-helpers.service';
import {ImDataObject} from '../../../../types/im-data-object';

@Component({
  selector: 'saim-summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.scss']
})
export class SummaryInfoComponent implements OnInit {
  @Input() vmwareObject: ImDataObject;

  constructor(public VmwareTemplateHelpers: AnyOpsOSAppInfrastructureVmwareTemplateHelpersService) { }

  ngOnInit() {
  }

}
