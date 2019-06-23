import {Component, Input, OnInit} from '@angular/core';
import {Application} from '@sysos/libs-application';
import {SysosAppSshService} from '../services/sysos-app-ssh.service';
import {SshConnection} from '../types/ssh-connection';

@Component({
  selector: 'sassh-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private Ssh: SysosAppSshService) { }

  ngOnInit() {
    this.Ssh.activeConnection.subscribe(connection => this.activeConnection = connection);
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
