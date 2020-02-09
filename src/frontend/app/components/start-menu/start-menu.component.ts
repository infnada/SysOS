import {Component, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})
export class StartMenuComponent implements OnDestroy, OnInit {
  private readonly destroySubject$: Subject<void> = new Subject();

  applications: Application[];
  activeApplication: string;

  openedMenu: string;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService) {
  }

  ngOnInit(): void {
    this.LibApplication.applications.pipe(takeUntil(this.destroySubject$)).subscribe((applications: Application[]) => this.applications = applications);
    this.LibApplication.activeApplication.pipe(takeUntil(this.destroySubject$)).subscribe((applicationUuid: string) => this.activeApplication = applicationUuid);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  openMenu(menu: string): void {
    if (this.openedMenu === menu) return this.openedMenu = null;
    this.openedMenu = menu;
  }

}
