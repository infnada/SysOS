import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;

  constructor(private Sftp: AnyOpsOSAppSftpService) { }

  ngOnInit(): void {
    this.Sftp.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }

  toggleExchange(): void {
    this.Sftp.toggleExchange();
  }

  newConnection(): void {

    // even if activeConnection === null, set it again to reset possible Form changes
    this.Sftp.setActiveConnection(null);
  }

  disconnectConnection(): void {
    if (this.activeConnection === null) return;

    this.Sftp.disconnectConnection();
  }

  deleteConnection(): void {
    if (this.activeConnection === null) return;

    this.Sftp.deleteConnection();
  }

  editConnection(): void {
    if (this.activeConnection === null) return;

    this.Sftp.editConnection();
  }
}
