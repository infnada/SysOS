import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrpc-sysos-modal-infrastructure-manager-remediation-pre-check',
  templateUrl: './sysos-modal-infrastructure-manager-remediation-pre-check.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-remediation-pre-check.component.scss']
})
export class SysosModalInfrastructureManagerRemediationPreCheckComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
