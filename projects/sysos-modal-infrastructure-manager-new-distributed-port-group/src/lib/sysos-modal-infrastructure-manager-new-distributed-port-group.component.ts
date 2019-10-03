import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimndpp-sysos-modal-infrastructure-manager-new-distributed-port-group',
  templateUrl: './sysos-modal-infrastructure-manager-new-distributed-port-group.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-distributed-port-group.component.scss']
})
export class SysosModalInfrastructureManagerNewDistributedPortGroupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
