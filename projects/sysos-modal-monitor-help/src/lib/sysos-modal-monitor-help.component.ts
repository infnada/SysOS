import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smmh-sysos-modal-monitor-help',
  templateUrl: './sysos-modal-monitor-help.component.html',
  styleUrls: ['./sysos-modal-monitor-help.component.scss']
})
export class SysosModalMonitorHelpComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
