import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimids-anyopsos-modal-infrastructure-manager-import-distributed-switch',
  templateUrl: './anyopsos-modal-infrastructure-manager-import-distributed-switch.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-import-distributed-switch.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerImportDistributedSwitchComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
