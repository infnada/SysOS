import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimesl-anyopsos-modal-infrastructure-manager-export-system-logs',
  templateUrl: './anyopsos-modal-infrastructure-manager-export-system-logs.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-export-system-logs.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerExportSystemLogsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
