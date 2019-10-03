import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimeca-sysos-modal-infrastructure-manager-edit-custom-attributes',
  templateUrl: './sysos-modal-infrastructure-manager-edit-custom-attributes.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-edit-custom-attributes.component.scss']
})
export class SysosModalInfrastructureManagerEditCustomAttributesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
