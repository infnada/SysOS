import {Component, Input, OnInit} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';

@Component({
  selector: 'smmx-anyopsos-modal-monitor-xss',
  templateUrl: './anyopsos-modal-monitor-xss.component.html',
  styleUrls: ['./anyopsos-modal-monitor-xss.component.scss']
})
export class AnyOpsOSModalMonitorXssComponent implements OnInit {
  @Input() serverUrl: any;

  private MonitorDashboardService;

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: AnyOpsOSLibServiceInjectorService) {
  }

  ngOnInit() {
    this.MonitorDashboardService = this.serviceInjector.get('AnyOpsOSAppMonitorDashboardService');
  }

  xssModalKeepXss() {

  }

  xssModalDisableXss() {
  }

}
