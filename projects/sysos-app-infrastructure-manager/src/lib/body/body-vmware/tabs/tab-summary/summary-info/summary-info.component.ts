import {Component, Input, OnInit} from '@angular/core';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {VMWareObject} from '../../../../../types/vmware-object';

@Component({
  selector: 'saim-summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.scss']
})
export class SummaryInfoComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) { }

  ngOnInit() {
  }

}
