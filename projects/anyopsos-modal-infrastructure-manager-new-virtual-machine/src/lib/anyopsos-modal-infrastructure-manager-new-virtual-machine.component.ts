import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnvm-anyopsos-modal-infrastructure-manager-new-virtual-machine',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-virtual-machine.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-virtual-machine.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewVirtualMachineComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
