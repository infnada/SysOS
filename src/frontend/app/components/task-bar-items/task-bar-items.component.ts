import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from "@angular/material";

import {ApplicationsService} from "../../services/applications.service";

import {Application} from "../../interfaces/application";
import {ContextMenuItem} from "../../interfaces/context-menu-item";

@Component({
  selector: 'app-task-bar-items',
  templateUrl: './task-bar-items.component.html',
  styleUrls: ['./task-bar-items.component.scss']
})
export class TaskBarItemsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;
  @Input() application: Application;

  taskbar__item_open: string;

  contextMenuPosition = {x: '0px', y: '0px'};

  onAppContextMenu(event: MouseEvent, application: Application): void {
    if (application.id === 'start') return;

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuApp.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem, application: Application): boolean {
    if (item.disabled) return item.disabled(application);
    return false;
  }

  contextToText(item: ContextMenuItem, application?: Application): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(application);
  }

  appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + this.getApplicationById(application.id).ico + '"></i></span> ' + this.getApplicationById(application.id).name;
      }, action: (application: Application) => {
        this.toggleApplication(application.id);
      }
    },
    {id: 2, text: 'divider'},
    {
      id: 3, text: (application: Application) => {
        if (application.pinned) {
          return '<span class="fa-stack"><i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i></span> Unpin from Task Bar';
        }
        return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
      }, action: (application: Application) => {
        // Pin application
        this.ApplicationsService.registerTaskBarApplication({
          id: application.id,
          pinned: !application.pinned
        }, true);
      }
    },
    {
      id: 4, text: '<span class="fa-stack"><i class="fa fa-stack-2x fa-times"></i></span> Close', action: (application: Application) => {
        this.ApplicationsService.sendCloseApplication(application);
      }, disabled: (application: Application) => {
        return !this.isApplicationOpened(application.id);
      }
    }
  ];

  constructor(private ApplicationsService: ApplicationsService) { }

  ngOnInit() {
    this.ApplicationsService.taskbar__item_open.subscribe(application => this.taskbar__item_open = application);
  }

  closeApplication(id: string): void {
    this.ApplicationsService.closeApplication(id);
  };

  getApplicationById(id: string): Application {
    return this.ApplicationsService.getApplicationById(id);
  };

  isStartOpened(id: string): boolean {
    return this.taskbar__item_open === id && id === 'start';
  };

  isItemOpened(id: string): boolean {
    return this.isApplicationOpened(id) && id !== 'start';
  };

  isItemActive(id: string): boolean {
    return this.taskbar__item_open === id && id !== 'start';
  };

  isApplicationOpened(id: string): boolean {
    return this.ApplicationsService.isApplicationOpened(id);
  };

  toggleApplication(id: string): void {
    if (id === 'start') return this.ApplicationsService.toggleApplication(id);

    // Open application
    if (!this.isApplicationOpened(id)) {
      this.ApplicationsService.openApplication(id);
      this.ApplicationsService.toggleApplication(id);
    }

    // Emitting to application directives (minimize or maximize)
    this.ApplicationsService.sendToggleApplication(id);
  };

}
