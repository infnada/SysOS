import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-body-snmp',
  templateUrl: './body-snmp.component.html',
  styleUrls: ['./body-snmp.component.scss']
})
export class BodySnmpComponent implements OnInit {
  @Input() snmpObject: DataObject;
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
