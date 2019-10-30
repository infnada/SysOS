import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@sysos/lib-application';

import {SysosAppSftpService} from '../services/sysos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Component({
  selector: 'sasftp-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;

  constructor(private Sftp: SysosAppSftpService) { }

  ngOnInit() {
    this.Sftp.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }

  toggleExchange(): void {
    this.Sftp.toggleExchange();
  }

  newConnection() {
    if (this.activeConnection === null) return;

    this.Sftp.setActiveConnection(null);
  }

  disconnectConnection() {
    if (this.activeConnection === null) return;

    this.Sftp.disconnectConnection();
  }

  deleteConnection() {
    if (this.activeConnection === null) return;

    this.Sftp.deleteConnection();
  }

  editConnection() {
    if (this.activeConnection === null) return;

    this.Sftp.editConnection();
  }
}
