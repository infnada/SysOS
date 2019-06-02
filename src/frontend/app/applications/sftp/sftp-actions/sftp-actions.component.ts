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

  constructor(private SftpService: SftpService) { }

  ngOnInit() {
    this.SftpService.activeConnection.subscribe(connection => this.activeConnection = connection);
  }

  getActiveConnection(): SftpConnection {
    return this.SftpService.getActiveConnection();
  }

  toggleExchange(): void {
    this.SftpService.toggleExchange();
  }

  newConnection() {
    if (this.activeConnection === null) return;

    this.SftpService.setActiveConnection(null);
  }

  disconnectConnection() {
    if (this.activeConnection === null) return;

    this.SftpService.disconnectConnection();
  }

  deleteConnection() {
    if (this.activeConnection === null) return;

    this.SftpService.deleteConnection();
  }

  editConnection() {
    if (this.activeConnection === null) return;

    this.SftpService.editConnection();
  }

}
