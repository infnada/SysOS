import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimadt-sysos-modal-infrastructure-manager-add-tag',
  templateUrl: './sysos-modal-infrastructure-manager-add-tag.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-add-tag.component.scss']
})
export class SysosModalInfrastructureManagerAddTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
