import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimal-sysos-modal-infrastructure-manager-assign-license',
  templateUrl: './sysos-modal-infrastructure-manager-assign-license.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-assign-license.component.scss']
})
export class SysosModalInfrastructureManagerAssignLicenseComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
