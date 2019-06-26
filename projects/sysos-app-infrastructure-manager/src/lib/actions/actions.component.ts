import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

@Component({
  selector: 'saim-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  constructor() {
  }

  ngOnInit() {
  }

}
