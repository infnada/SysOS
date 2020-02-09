import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibSshService} from '@anyopsos/lib-ssh';
import {ConnectionSsh} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';

@Component({
  selector: 'aassh-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibSsh: AnyOpsOSLibSshService,
              private readonly Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.Ssh.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionSsh> {
    return this.Ssh.activeConnection;
  }

  newConnection(): void {

    // even if activeConnectionUuid === null, set it again to reset possible Form changes
    this.Ssh.setActiveConnectionUuid();
  }

  disconnectConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.LibSsh.disconnectConnection(this.activeConnectionUuid).then(() => {

      // Remove terminalMap to not reuse the same on reconnect
      this.Ssh.deleteTerminalMap(this.activeConnectionUuid);
    });
  }

  deleteConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Ssh.deleteConnection();
  }

  editConnection(): void {
    if (this.activeConnectionUuid === null) return;

    this.Ssh.editConnection();
  }

  isSftpApplicationInstalled(): boolean {
    return this.LibApplication.isApplicationInstalled('sftp');
  }

  openSftp(): void {
    this.LibApplication.openApplication('sftp', this.activeConnectionUuid)
  }
}
