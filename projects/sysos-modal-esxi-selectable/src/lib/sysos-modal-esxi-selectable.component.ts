import {Component, Input} from '@angular/core';

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {SysosLibServiceInjectorService} from "@sysos/lib-service-injector";
import {IMESXiHost} from "@sysos/app-infrastructure-manager";

@Component({
  selector: 'smesx-sysos-modal-esxi-selectable',
  templateUrl: './sysos-modal-esxi-selectable.component.html',
  styleUrls: ['./sysos-modal-esxi-selectable.component.scss']
})
export class SysosModalEsxiSelectableComponent {
  private InfrastructureManagerVMWare;

  selectedHost: IMESXiHost;
  ESXIHosts: IMESXiHost[];

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService) {

    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');
    this.ESXIHosts = this.InfrastructureManagerVMWare.getESXihosts()
  }

}
