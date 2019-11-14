import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {ContextMenuItem} from '@anyopsos/lib-types';

@Component({
  selector: 'app-task-bar-items',
  templateUrl: './task-bar-items.component.html',
  styleUrls: ['./task-bar-items.component.scss']
})
export class TaskBarItemsComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;
  @Input() application: Application;

  taskbarItemOpen: string;
  contextMenuPosition = {x: '0px', y: '0px'};
  appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack">' +
          '<i class="fa-stack-2x ' + this.getApplicationById(application.id).ico + '"></i>' +
          '</span> ' + this.getApplicationById(application.id).name;
      }, action: (application: Application) => {
        this.toggleApplication(application.id);
      }
    },
    {id: 2, text: 'divider'},
    {
      id: 3, text: (application: Application) => {
        if (application.pinned) {
          return '<span class="fa-stack">' +
            '<i class="fas fa-thumbtack fa-stack-2x"></i><i class="fas fa-ban fa-stack-1x text-danger"></i>' +
            '</span> Unpin from Task Bar';
        }
        return '<span class="fa-stack"><i class="fas fa-stack-2x fa-thumbtack fa-rotate-90"></i></span> Pin to Task Bar';
      }, action: (application: Application) => {
        // Pin application
        this.Applications.registerTaskBarApplication({
          id: application.id,
          pinned: !application.pinned
        }, true);
      }
    },
    {
      id: 4, text: '<span class="fa-stack"><i class="fas fa-stack-2x fa-times"></i></span> Close', action: (application: Application) => {
        this.Applications.sendCloseApplication(application);
      }, disabled: (application: Application) => {
        return !this.isApplicationOpened(application.id);
      }
    }
  ];


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

  constructor(private Applications: AnyOpsOSLibApplicationService) { }

  ngOnInit() {
    this.Applications.taskbarItemOpen.subscribe(application => this.taskbarItemOpen = application);
  }

  getApplicationById(id: string): Application {
    return this.Applications.getApplicationById(id);
  }

  isStartOpened(id: string): boolean {
    return this.taskbarItemOpen === id && id === 'start';
  }

  isItemOpened(id: string): boolean {
    return this.isApplicationOpened(id) && id !== 'start';
  }

  isItemActive(id: string): boolean {
    return this.taskbarItemOpen === id && id !== 'start';
  }

  isApplicationOpened(id: string): boolean {
    return this.Applications.isApplicationOpened(id);
  }

  toggleApplication(id: string): void {
    if (id === 'start') return this.Applications.toggleApplication(id);

    // Open application
    if (!this.isApplicationOpened(id)) return this.Applications.openApplication(id);

    this.Applications.sendToggleApplication(id);
  }

}
