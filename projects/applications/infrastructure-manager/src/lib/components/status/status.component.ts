import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

@Component({
  selector: 'aaim-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string | null;

  constructor(private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.InfrastructureManager.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionTypes | null> {
    return this.InfrastructureManager.activeConnection;
  }

  async getHostOrClusterName(): Promise<string> {
    const connection: ConnectionTypes | null = await this.InfrastructureManager.getActiveConnection();

    if (connection?.type === 'kubernetes' || connection?.type === 'docker') return connection.clusterName;
    return connection.host;
  }

}
