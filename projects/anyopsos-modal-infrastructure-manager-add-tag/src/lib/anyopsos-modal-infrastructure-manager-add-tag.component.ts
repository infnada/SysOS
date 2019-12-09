import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimadt-anyopsos-modal-infrastructure-manager-add-tag',
  templateUrl: './anyopsos-modal-infrastructure-manager-add-tag.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-add-tag.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerAddTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
