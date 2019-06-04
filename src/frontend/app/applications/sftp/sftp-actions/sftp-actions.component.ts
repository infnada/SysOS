import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {SftpService} from '../services/sftp.service';
import {SftpConnection} from '../SftpConnection';

@Component({
  selector: 'app-sftp-actions',
  templateUrl: './sftp-actions.component.html',
  styleUrls: ['./sftp-actions.component.scss']
})
export class SftpActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private Sftp: SftpService) { }

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
