import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimids-sysos-modal-infrastructure-manager-import-distributed-switch',
  templateUrl: './sysos-modal-infrastructure-manager-import-distributed-switch.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-import-distributed-switch.component.scss']
})
export class SysosModalInfrastructureManagerImportDistributedSwitchComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
