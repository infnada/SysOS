import {Component, Input} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

import {VMWareObject} from '../../types/vmware-object';

@Component({
  selector: 'saim-body-vmware',
  templateUrl: './body-vmware.component.html',
  styleUrls: ['./body-vmware.component.scss']
})
export class BodyVmwareComponent {
  @Input() vmwareObject: VMWareObject;
  @Input() application: Application;

  constructor() {
  }

}
