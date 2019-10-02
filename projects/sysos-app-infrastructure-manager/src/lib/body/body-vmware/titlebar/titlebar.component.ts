import {Component, Input, OnInit} from '@angular/core';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from "../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service";

import {VMWareObject} from "../../../types/vmware-object";

@Component({
  selector: 'saim-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService) { }

  ngOnInit() {
  }

  showActionsMenu() {

  }

}
