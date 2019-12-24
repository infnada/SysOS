import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'saiac-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  activeProject: string;

  constructor() { }

  ngOnInit(): void {
  }

  newProject() {

  }

  editProject() {

  }

  deleteProject() {

  }

  configureProject() {

  }
}
