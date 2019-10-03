import {Component, Input, OnInit} from '@angular/core';
import {VMWareObject} from '../../../types/vmware-object';

@Component({
  selector: 'saim-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;

  constructor() { }

  ngOnInit() {
  }

}
