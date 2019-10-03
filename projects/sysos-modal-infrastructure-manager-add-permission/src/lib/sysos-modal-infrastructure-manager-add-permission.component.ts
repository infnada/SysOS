import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimap-sysos-modal-infrastructure-manager-add-permission',
  templateUrl: './sysos-modal-infrastructure-manager-add-permission.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-add-permission.component.scss']
})
export class SysosModalInfrastructureManagerAddPermissionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
