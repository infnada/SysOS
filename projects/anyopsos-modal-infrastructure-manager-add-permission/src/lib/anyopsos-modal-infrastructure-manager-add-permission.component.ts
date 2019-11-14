import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimap-anyopsos-modal-infrastructure-manager-add-permission',
  templateUrl: './anyopsos-modal-infrastructure-manager-add-permission.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-add-permission.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerAddPermissionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
