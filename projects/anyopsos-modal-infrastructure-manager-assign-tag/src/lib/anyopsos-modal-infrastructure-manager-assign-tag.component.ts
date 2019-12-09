import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimat-anyopsos-modal-infrastructure-manager-assign-tag',
  templateUrl: './anyopsos-modal-infrastructure-manager-assign-tag.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-assign-tag.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerAssignTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
