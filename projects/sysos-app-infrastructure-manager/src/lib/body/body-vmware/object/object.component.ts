import {Component, Input, OnInit} from '@angular/core';
import {VMWareObject} from '../../../types/vmware-object';

@Component({
  selector: 'saim-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor() {
  }

  ngOnInit() {
  }

}
