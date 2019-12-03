import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {ImDataObject} from '../../../types/im-data-object';

@Component({
  selector: 'saim-body-snmp',
  templateUrl: './body-snmp.component.html',
  styleUrls: ['./body-snmp.component.scss']
})
export class BodySnmpComponent implements OnInit {
  @Input() snmpObject: ImDataObject;
  @Input() application: Application;

  constructor() {
  }

  ngOnInit() {
  }

}
