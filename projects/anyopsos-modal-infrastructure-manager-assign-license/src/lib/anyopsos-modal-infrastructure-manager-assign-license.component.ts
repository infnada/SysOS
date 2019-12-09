import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimal-anyopsos-modal-infrastructure-manager-assign-license',
  templateUrl: './anyopsos-modal-infrastructure-manager-assign-license.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-assign-license.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerAssignLicenseComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
