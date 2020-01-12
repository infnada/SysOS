import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'aaiac-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
