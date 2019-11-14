import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnc-anyopsos-modal-infrastructure-manager-new-cluster',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-cluster.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-cluster.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewClusterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
