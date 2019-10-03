import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnvm-sysos-modal-infrastructure-manager-new-virtual-machine',
  templateUrl: './sysos-modal-infrastructure-manager-new-virtual-machine.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-virtual-machine.component.scss']
})
export class SysosModalInfrastructureManagerNewVirtualMachineComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
