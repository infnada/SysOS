import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimat-sysos-modal-infrastructure-manager-assign-tag',
  templateUrl: './sysos-modal-infrastructure-manager-assign-tag.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-assign-tag.component.scss']
})
export class SysosModalInfrastructureManagerAssignTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
