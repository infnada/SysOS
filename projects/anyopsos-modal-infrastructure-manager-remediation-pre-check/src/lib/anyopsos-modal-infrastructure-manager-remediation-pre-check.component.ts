import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrpc-anyopsos-modal-infrastructure-manager-remediation-pre-check',
  templateUrl: './anyopsos-modal-infrastructure-manager-remediation-pre-check.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-remediation-pre-check.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerRemediationPreCheckComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
