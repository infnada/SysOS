import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrt-anyopsos-modal-infrastructure-manager-remove-tag',
  templateUrl: './anyopsos-modal-infrastructure-manager-remove-tag.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-remove-tag.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerRemoveTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
