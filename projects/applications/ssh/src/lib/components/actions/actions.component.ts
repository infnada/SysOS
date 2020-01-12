import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';
import {SshConnection} from '../../types/ssh-connection';

@Component({
  selector: 'aassh-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;

  constructor(private Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Listen for activeConnection change
    this.Ssh.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

  newConnection(): void {

    // even if activeConnection === null, set it again to reset possible Form changes
    this.Ssh.setActiveConnection(null);
  }

  disconnectConnection(): void {
    if (this.activeConnection === null) return;

    this.Ssh.disconnectConnection();
  }

  deleteConnection(): void {
    if (this.activeConnection === null) return;

    this.Ssh.deleteConnection();
  }

  editConnection(): void {
    if (this.activeConnection === null) return;

    this.Ssh.editConnection();
  }
}
