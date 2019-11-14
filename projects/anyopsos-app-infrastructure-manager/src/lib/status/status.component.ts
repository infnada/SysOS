import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureManagerService} from '../services/anyopsos-app-infrastructure-manager.service';
import {ImConnection} from '../types/im-connection';

@Component({
  selector: 'saim-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  activeConnection: string;

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(activeConnection => this.activeConnection = activeConnection);
  }

  getActiveConnection(returnMain): ImConnection {
    return this.InfrastructureManager.getActiveConnection(returnMain);
  }

}
