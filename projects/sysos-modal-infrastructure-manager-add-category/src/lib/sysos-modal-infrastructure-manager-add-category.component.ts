import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimac-sysos-modal-infrastructure-manager-add-category',
  templateUrl: './sysos-modal-infrastructure-manager-add-category.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-add-category.component.scss']
})
export class SysosModalInfrastructureManagerAddCategoryComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
