import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnd-sysos-modal-infrastructure-manager-new-datacenter',
  templateUrl: './sysos-modal-infrastructure-manager-new-datacenter.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-datacenter.component.scss']
})
export class SysosModalInfrastructureManagerNewDatacenterComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
