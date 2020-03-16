import {Component, Input, OnInit} from '@angular/core';

import {NetdataConnection} from '@anyopsos/ext-lib-netdata';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';



@Component({
  selector: 'aaim-tab-monitor',
  templateUrl: './tab-monitor.component.html',
  styleUrls: ['./tab-monitor.component.scss']
})
export class TabMonitorComponent implements OnInit {
  @Input() nmObject: DataObject;
  @Input() monitorConnection: NetdataConnection;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService) {
  }

  ngOnInit(): void {
  }

  manageMonitors() {
    this.LibApplication.openApplication('monitor');
  }

}
