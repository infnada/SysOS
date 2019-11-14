import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnDestroy, OnInit {
  @ViewChild(MatMenuTrigger) contextMenuApp: MatMenuTrigger;

  private destroySubject$: Subject<void> = new Subject();

  applications: Application[];
  taskbarItemOpen: string;

  openedMenu: string;

  constructor(private Applications: AnyOpsOSLibApplicationService) {
  }

  ngOnInit() {
    this.Applications.applications.pipe(takeUntil(this.destroySubject$)).subscribe(applications => this.applications = applications);
    this.Applications.taskbarItemOpen.pipe(takeUntil(this.destroySubject$)).subscribe(applications => this.taskbarItemOpen = applications);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  openMenu(menu: string) {
    if (this.openedMenu === menu) return this.openedMenu = null;
    this.openedMenu = menu;
  }

}
