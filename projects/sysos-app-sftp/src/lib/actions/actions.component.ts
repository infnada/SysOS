import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/libs-application';

import {SysosAppSftpService} from '../services/sysos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Component({
  selector: 'sasftp-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private Sftp: SysosAppSftpService) { }

  ngOnInit() {
    this.Sftp.activeConnection.subscribe(connection => this.activeConnection = connection);
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
