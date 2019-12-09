import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnd-anyopsos-modal-infrastructure-manager-new-datacenter',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-datacenter.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-datacenter.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewDatacenterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
