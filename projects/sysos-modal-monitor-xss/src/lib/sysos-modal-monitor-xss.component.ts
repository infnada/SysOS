import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';

@Component({
  selector: 'smmx-sysos-modal-monitor-xss',
  templateUrl: './sysos-modal-monitor-xss.component.html',
  styleUrls: ['./sysos-modal-monitor-xss.component.scss']
})
export class SysosModalMonitorXssComponent implements OnInit {
  @Input() serverUrl: any;

  private MonitorDashboardService;

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService) {
  }

  ngOnInit() {
    this.MonitorDashboardService = this.serviceInjector.get('SysosAppMonitorDashboardService');
  }

  xssModalKeepXss() {

  }

  xssModalDisableXss() {
  }

}
