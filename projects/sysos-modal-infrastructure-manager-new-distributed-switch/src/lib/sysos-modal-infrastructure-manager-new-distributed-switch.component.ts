import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnds-sysos-modal-infrastructure-manager-new-distributed-switch',
  templateUrl: './sysos-modal-infrastructure-manager-new-distributed-switch.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-distributed-switch.component.scss']
})
export class SysosModalInfrastructureManagerNewDistributedSwitchComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
