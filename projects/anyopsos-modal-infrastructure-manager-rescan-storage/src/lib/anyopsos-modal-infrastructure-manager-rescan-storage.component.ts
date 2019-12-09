import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimrs-anyopsos-modal-infrastructure-manager-rescan-storage',
  templateUrl: './anyopsos-modal-infrastructure-manager-rescan-storage.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-rescan-storage.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerRescanStorageComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
