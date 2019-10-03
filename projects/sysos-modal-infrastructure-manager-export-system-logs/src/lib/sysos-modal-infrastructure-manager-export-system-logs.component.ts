import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimesl-sysos-modal-infrastructure-manager-export-system-logs',
  templateUrl: './sysos-modal-infrastructure-manager-export-system-logs.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-export-system-logs.component.scss']
})
export class SysosModalInfrastructureManagerExportSystemLogsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
