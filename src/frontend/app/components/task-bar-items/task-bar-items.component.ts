import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibDesktopTaskBarService, TaskbarApplication} from '@anyopsos/lib-desktop-task-bar';
import {ContextMenuItem} from '@anyopsos/lib-types';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-task-bar-items',
  templateUrl: './task-bar-items.component.html',
  styleUrls: ['./task-bar-items.component.scss']
})
export class TaskBarItemsComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger, {static: false}) readonly contextMenuApp: MatMenuTrigger;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  private activeApplication: string;
  readonly contextMenuPosition = {x: '0px', y: '0px'};
  readonly appContextMenuItems: ContextMenuItem[] = [
    {
      id: 1, text: (application: Application) => {
        return '<span class="fa-stack">' +
          '<i class="fa-stack-2x ' + this.getApplicationByUuid(application.uuid).ico + '"></i>' +
          '</span> ' + this.getApplicationByUuid(application.uuid).name;
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
      }, action: (application: TaskbarApplication) => {
        this.PinOrUnpinApplication(application);
      }
    },
    {
      id: 4, text: '<span class="fa-stack"><i class="fas fa-stack-2x fa-times"></i></span> Close', action: (application: Application) => {
        this.LibApplication.sendCloseApplication(application);
      }, disabled: (application: Application) => {
        return !this.isApplicationOpened(application.uuid);
      }
    }
  ];

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibDesktopTaskBar: AnyOpsOSLibDesktopTaskBarService) {
  }

  ngOnInit(): void {
    this.LibApplication.activeApplication.pipe(takeUntil(this.destroySubject$)).subscribe((applicationUuid: string) => this.activeApplication = applicationUuid);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  private PinOrUnpinApplication(application: TaskbarApplication): void {
    this.LibDesktopTaskBar.registerTaskBarApplication({
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

  getApplicationByUuid(applicationUuid: string): Application {
    const application: Application = this.LibApplication.getApplicationByUuid(applicationUuid);
    if (application) return this.LibApplication.getApplicationByUuid(applicationUuid);

    this.logger.error('TaskBarItems', 'Error while getting pinned application. Unpin.');
    this.PinOrUnpinApplication({
      uuid: applicationUuid,
      pinned: true // PinOrUnpinApplication will change it back with !pinned (so, false), that's why we specify 'true' here
    });
  }

  isStartOpened(applicationUuid: string): boolean {
    return this.activeApplication === applicationUuid && applicationUuid === 'start';
  }

  isItemOpened(applicationUuid: string): boolean {
    return this.isApplicationOpened(applicationUuid) && applicationUuid !== 'start';
  }

  isItemActive(applicationUuid: string): boolean {
    return this.activeApplication === applicationUuid && applicationUuid !== 'start';
  }

  isApplicationOpened(applicationUuid: string): boolean {
    return this.LibApplication.isApplicationOpened(applicationUuid);
  }

  toggleApplication(applicationUuid: string): void {
    if (applicationUuid === 'start') return this.LibApplication.toggleApplication(applicationUuid);

    // Open application
    if (!this.isApplicationOpened(applicationUuid)) return this.LibApplication.openApplication(applicationUuid);
    this.LibApplication.sendToggleApplication(applicationUuid);
  }

}
