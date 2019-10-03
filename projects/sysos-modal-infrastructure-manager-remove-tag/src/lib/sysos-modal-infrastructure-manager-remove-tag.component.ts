import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrt-sysos-modal-infrastructure-manager-remove-tag',
  templateUrl: './sysos-modal-infrastructure-manager-remove-tag.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-remove-tag.component.scss']
})
export class SysosModalInfrastructureManagerRemoveTagComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
