import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimndc-anyopsos-modal-infrastructure-manager-new-datastore-cluster',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-datastore-cluster.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-datastore-cluster.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewDatastoreClusterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
