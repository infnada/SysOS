import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnad-anyopsos-modal-infrastructure-manager-new-alarm-definition',
  templateUrl: './anyopsos-modal-infrastructure-manager-new-alarm-definition.component.html',
  styleUrls: ['./anyopsos-modal-infrastructure-manager-new-alarm-definition.component.scss']
})
export class AnyOpsOSModalInfrastructureManagerNewAlarmDefinitionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
