import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';

@Component({
  selector: 'aasftp-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string | null;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibSsh: AnyOpsOSLibSshService,
              private readonly Sftp: AnyOpsOSAppSftpService) {

  }

  ngOnInit(): void {

    // Listen for activeConnection change
    this.Sftp.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionSftp | null> {
    return this.Sftp.activeConnection;
  }

  toggleExchange(): void {
    this.Sftp.toggleExchange();
  }

  newConnection(): void {

    // even if activeConnection === null, set it again to reset possible Form changes
    this.Sftp.setActiveConnectionUuid();
  }

  disconnectConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.LibSsh.disconnectConnection(this.activeConnectionUuid);
  }

  deleteConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Sftp.deleteConnection();
  }

  editConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Sftp.editConnection();
  }

  isSshApplicationInstalled(): boolean {
    return this.LibApplication.isApplicationInstalled('ssh');
  }

  openSsh(): void {
    this.LibApplication.openApplication('ssh', this.activeConnectionUuid)
  }
}
