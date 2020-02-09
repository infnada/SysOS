import {Component, OnInit, Input} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'aacm-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() private readonly application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
