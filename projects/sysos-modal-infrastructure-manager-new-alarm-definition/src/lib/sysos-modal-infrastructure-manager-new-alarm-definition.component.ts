import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smimnad-sysos-modal-infrastructure-manager-new-alarm-definition',
  templateUrl: './sysos-modal-infrastructure-manager-new-alarm-definition.component.html',
  styleUrls: ['./sysos-modal-infrastructure-manager-new-alarm-definition.component.scss']
})
export class SysosModalInfrastructureManagerNewAlarmDefinitionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
