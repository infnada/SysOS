import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnc-sysos-modal-infrastructure-manager-new-cluster',
  templateUrl: './sysos-modal-infrastructure-manager-new-cluster.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-cluster.component.scss']
})
export class SysosModalInfrastructureManagerNewClusterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
