import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnd-anyopsos-modal-infrastructure-manager-new-datastore',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-datastore.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-datastore.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewDatastoreComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
