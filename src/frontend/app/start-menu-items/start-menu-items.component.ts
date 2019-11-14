import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {ContextMenuItem} from '@anyopsos/lib-types';

@Component({
  selector: 'app-start-menu-items',
  templateUrl: './start-menu-items.component.html',
  styleUrls: ['./start-menu-items.component.scss']
})
export class StartMenuItemsComponent implements OnDestroy, OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  taskbarItemOpen: string;
  contextMenuPosition = {x: '0px', y: '0px'};
  appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack"><i class="fa-stack-2x ' + application.ico + '"></i></span> ' + application.name;
      }, action: (application: Application) => {
        this.toggleApplication(application.id);
      }
    },
    {id: 2, text: 'divider'},
    {
      id: 3, text: (application: Application) => {
        if (this.Applications.isApplicationPinned(application.id)) {
          return '<span class="fa-stack">' +
            '<i class="fas fa-thumbtack fa-stack-2x"></i><i class="fas fa-ban fa-stack-1x text-danger"></i>' +
            '</span> Unpin from Task Bar';
        }
        return '<span class="fa-stack"><i class="fas fa-stack-2x fa-thumbtack fa-rotate-90"></i></span> Pin to Task Bar';
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

  constructor(private Applications: AnyOpsOSLibApplicationService) { }

  ngOnInit() {
    this.Applications.taskbarItemOpen.pipe(takeUntil(this.destroySubject$)).subscribe(applications => this.taskbarItemOpen = applications);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  toggleApplication(id: string): void {
    if (id === 'start') return this.Applications.toggleApplication(id);

    // Open application
    if (!this.Applications.isApplicationOpened(id)) return this.Applications.openApplication(id);

    this.Applications.sendToggleApplication(id);
  }

}
