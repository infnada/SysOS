import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";

import {ApplicationsService} from "../../services/applications.service";

import {Application} from "../../interfaces/application";

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;

  applications: Application[];
  taskbar__item_open: string;

  openedMenu: string;


  constructor(private ApplicationsService: ApplicationsService) {
  }

  ngOnInit() {
    this.ApplicationsService.applications.subscribe(applications => this.applications = applications);
    this.ApplicationsService.taskbar__item_open.subscribe(applications => this.taskbar__item_open = applications);
  }

  openMenu(menu: string) {
    if (this.openedMenu === menu) return this.openedMenu = null;
    this.openedMenu = menu;
  };

}
