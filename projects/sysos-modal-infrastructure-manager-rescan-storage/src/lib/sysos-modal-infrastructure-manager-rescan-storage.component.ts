import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrs-sysos-modal-infrastructure-manager-rescan-storage',
  templateUrl: './sysos-modal-infrastructure-manager-rescan-storage.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-rescan-storage.component.scss']
})
export class SysosModalInfrastructureManagerRescanStorageComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
