import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimac-anyopsos-modal-infrastructure-manager-add-category',
  templateUrl: './anyopsos-modal-infrastructure-manager-add-category.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-add-category.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerAddCategoryComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
