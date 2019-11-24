import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureManagerService} from '../services/anyopsos-app-infrastructure-manager.service';;
import {ConnectionTypes} from '../types/connections/connection-types';

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

  getActiveConnection(): ConnectionTypes {
    return this.InfrastructureManager.getActiveConnection();
  }

  getHostOrClusterName(): string {
    const connection = this.InfrastructureManager.getActiveConnection();

    if (connection.type === 'kubernetes' || connection.type === 'docker') return connection.clusterName;
    return connection.host;
  }

}
