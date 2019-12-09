import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimeca-anyopsos-modal-infrastructure-manager-edit-custom-attributes',
  templateUrl: './anyopsos-modal-infrastructure-manager-edit-custom-attributes.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-edit-custom-attributes.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerEditCustomAttributesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
