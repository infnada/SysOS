import {Component, Input, OnInit} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-tab-alarms',
  templateUrl: './tab-alarms.component.html',
  styleUrls: ['./tab-alarms.component.scss']
})
export class TabAlarmsComponent implements OnInit {
  @Input() nmObject: DataObject;

  constructor() {
  }

  ngOnInit(): void {
  }

}
