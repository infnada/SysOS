import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService, Application, TaskbarApplication} from '@anyopsos/lib-application';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {ContextMenuItem} from '@anyopsos/lib-types';

@Component({
  selector: 'app-task-bar-items',
  templateUrl: './task-bar-items.component.html',
  styleUrls: ['./task-bar-items.component.scss']
})
export class TaskBarItemsComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: false}) contextMenuApp: MatMenuTrigger;
  @Input() application: Application;

  taskbarItemOpen: string;
  contextMenuPosition = {x: '0px', y: '0px'};
  appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack">' +
          '<i class="fa-stack-2x ' + this.getApplicationById(application.uuid).ico + '"></i>' +
          '</span> ' + this.getApplicationById(application.uuid).name;
      }, action: (application: Application) => {
        this.toggleApplication(application.uuid);
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
        this.PinOrUnpinApplication(application);
      }
    },
    {
      id: 4, text: '<span class="fa-stack"><i class="fas fa-stack-2x fa-times"></i></span> Close', action: (application: Application) => {
        this.Applications.sendCloseApplication(application);
      }, disabled: (application: Application) => {
        return !this.isApplicationOpened(application.uuid);
      }
    }
  ];

  constructor(private logger: AnyOpsOSLibLoggerService,
              private Applications: AnyOpsOSLibApplicationService) {
  }

  ngOnInit(): void {
    this.Applications.taskbarItemOpen.subscribe((applicationUuid: string) => this.taskbarItemOpen = applicationUuid);
  }

  private PinOrUnpinApplication(application: Application) {
    this.Applications.registerTaskBarApplication({
      uuid: application.uuid,
      pinned: !application.pinned
    }, true);
  }

  onAppContextMenu(event: MouseEvent, application: Application): void {
    if (application.uuid === 'start') return;

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

  getApplicationById(applicationUuid: string): Application {
    const application: Application = this.Applications.getApplicationById(applicationUuid);
    if (application) return this.Applications.getApplicationById(applicationUuid);

    this.logger.error('TaskBarItems', 'Error while getting pinned application. Unpin.');
    this.PinOrUnpinApplication(application);
  }

  isStartOpened(applicationUuid: string): boolean {
    return this.taskbarItemOpen === applicationUuid && applicationUuid === 'start';
  }

  isItemOpened(applicationUuid: string): boolean {
    return this.isApplicationOpened(applicationUuid) && applicationUuid !== 'start';
  }

  isItemActive(applicationUuid: string): boolean {
    return this.taskbarItemOpen === applicationUuid && applicationUuid !== 'start';
  }

  isApplicationOpened(applicationUuid: string): boolean {
    return this.Applications.isApplicationOpened(applicationUuid);
  }

  toggleApplication(applicationUuid: string): void {
    if (applicationUuid === 'start') return this.Applications.toggleApplication(applicationUuid);

    // Open application
    if (!this.isApplicationOpened(applicationUuid)) return this.Applications.openApplication(applicationUuid);
    this.Applications.sendToggleApplication(applicationUuid);
  }

}
