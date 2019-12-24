import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'saiac-body-new-project',
  templateUrl: './body-new-project.component.html',
  styleUrls: ['./body-new-project.component.scss']
})
export class BodyNewProjectComponent implements OnInit {
  @Input() application: Application;

  constructor() {
  }

  ngOnInit(): void {
  }

}
