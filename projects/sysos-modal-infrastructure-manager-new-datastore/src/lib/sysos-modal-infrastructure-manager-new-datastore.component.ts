import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnd-sysos-modal-infrastructure-manager-new-datastore',
  templateUrl: './sysos-modal-infrastructure-manager-new-datastore.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-datastore.component.scss']
})
export class SysosModalInfrastructureManagerNewDatastoreComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
