import {Component, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'smmi-sysos-modal-monitor-import',
  templateUrl: './sysos-modal-monitor-import.component.html',
  styleUrls: ['./sysos-modal-monitor-import.component.scss']
})
export class SysosModalMonitorImportComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {

  }

}
