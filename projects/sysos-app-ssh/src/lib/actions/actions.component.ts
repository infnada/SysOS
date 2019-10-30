import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@sysos/lib-application';

import {SysosAppSshService} from '../services/sysos-app-ssh.service';
import {SshConnection} from '../types/ssh-connection';

@Component({
  selector: 'sassh-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;

  constructor(private Ssh: SysosAppSshService) { }

  ngOnInit() {
    this.Ssh.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

  newConnection() {
    if (this.activeConnection === null) return;

    this.Ssh.setActiveConnection(null);
  }

  disconnectConnection() {
    if (this.activeConnection === null) return;

    this.Ssh.disconnectConnection();
  }

  deleteConnection() {
    if (this.activeConnection === null) return;

    this.Ssh.deleteConnection();
  }

  editConnection() {
    if (this.activeConnection === null) return;

    this.Ssh.editConnection();
  }
}
