import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material';

import {Application, SysosLibsApplicationService} from '@sysos/libs-application';
import {ContextMenuItem} from '@sysos/libs-types';

@Component({
  selector: 'app-start-menu-items',
  templateUrl: './start-menu-items.component.html',
  styleUrls: ['./start-menu-items.component.scss']
})
export class StartMenuItemsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;
  @Input() application: Application;

  taskbarItemOpen: string;
  contextMenuPosition = {x: '0px', y: '0px'};
  appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack"><i class="fa fa-stack-2x fa-' + application.ico + '"></i></span> ' + application.name;
      }, action: (application: Application) => {
        this.toggleApplication(application.id);
      }
    },
    {id: 2, text: 'divider'},
    {
      id: 3, text: (application: Application) => {
        if (this.Applications.isApplicationPinned(application.id)) {
          return '<span class="fa-stack">' +
            '<i class="fa fa-thumb-tack fa-stack-2x"></i><i class="fa fa-ban fa-stack-1x text-danger"></i>' +
            '</span> Unpin from Task Bar';
        }
        return '<span class="fa-stack"><i class="fa fa-stack-2x fa-thumb-tack fa-rotate-90"></i></span> Pin to Task Bar';
      }, action: (application: Application) => {
        // Pin application
        this.Applications.registerTaskBarApplication({
          id: application.id,
          pinned: !this.Applications.isApplicationPinned(application.id)
        }, true);
      }
    }
  ];

  onAppContextMenu(event: MouseEvent): void {
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

  constructor(private Applications: SysosLibsApplicationService) { }

  ngOnInit() {
    this.Applications.taskbarItemOpen.subscribe(applications => this.taskbarItemOpen = applications);
  }

  toggleApplication(id: string): void {
    if (id === 'start') return this.Applications.toggleApplication(id);

    // Open application
    if (!this.Applications.isApplicationOpened(id)) return this.Applications.openApplication(id);

    this.Applications.sendToggleApplication(id);
  }

}
