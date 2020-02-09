import {Component, Input, ViewChild} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibDesktopTaskBarService} from '@anyopsos/lib-desktop-task-bar';
import {ContextMenuItem} from '@anyopsos/lib-types';

@Component({
  selector: 'app-start-menu-items',
  templateUrl: './start-menu-items.component.html',
  styleUrls: ['./start-menu-items.component.scss']
})
export class StartMenuItemsComponent {
  @ViewChild(MatMenuTrigger, {static: false}) readonly contextMenuApp: MatMenuTrigger;
  @Input() readonly application: Application;

  readonly contextMenuPosition = {x: '0px', y: '0px'};
  readonly appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack"><i class="fa-stack-2x ' + application.ico + '"></i></span> ' + application.name;
      }, action: (application: Application) => {
        this.toggleApplication(application.uuid);
      }
    },
    {id: 2, text: 'divider'},
    {
      id: 3, text: (application: Application) => {
        if (this.LibDesktopTaskBar.isApplicationPinned(application.uuid)) {
          return '<span class="fa-stack">' +
            '<i class="fas fa-thumbtack fa-stack-2x"></i><i class="fas fa-ban fa-stack-1x text-danger"></i>' +
            '</span> Unpin from Task Bar';
        }
        return '<span class="fa-stack"><i class="fas fa-stack-2x fa-thumbtack fa-rotate-90"></i></span> Pin to Task Bar';
      }, action: (application: Application) => {
        // Pin application
        this.LibDesktopTaskBar.registerTaskBarApplication({
          uuid: application.uuid,
          pinned: !this.LibDesktopTaskBar.isApplicationPinned(application.uuid)
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

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibDesktopTaskBar: AnyOpsOSLibDesktopTaskBarService) {

  }

  toggleApplication(id: string): void {
    if (id === 'start') return this.LibApplication.toggleApplication(id);

    // Open application
    if (!this.LibApplication.isApplicationOpened(id)) return this.LibApplication.openApplication(id);

    this.LibApplication.sendToggleApplication(id);
  }

}
