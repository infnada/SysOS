import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

import {Application, SysosLibApplicationService} from '@sysos/lib-application';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;

  applications: Application[];
  taskbarItemOpen: string;

  openedMenu: string;


  constructor(private Applications: SysosLibApplicationService) {
  }

  ngOnInit() {
    this.Applications.applications.subscribe(applications => this.applications = applications);
    this.Applications.taskbarItemOpen.subscribe(applications => this.taskbarItemOpen = applications);
  }

  openMenu(menu: string) {
    if (this.openedMenu === menu) return this.openedMenu = null;
    this.openedMenu = menu;
  }

}
