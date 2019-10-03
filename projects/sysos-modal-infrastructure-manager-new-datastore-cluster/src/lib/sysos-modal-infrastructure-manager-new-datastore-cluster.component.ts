import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimndc-sysos-modal-infrastructure-manager-new-datastore-cluster',
  templateUrl: './sysos-modal-infrastructure-manager-new-datastore-cluster.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-datastore-cluster.component.scss']
})
export class SysosModalInfrastructureManagerNewDatastoreClusterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
