import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {SshService} from '../ssh.service';
import {SshConnection} from '../SshConnection';

@Component({
  selector: 'app-ssh-actions',
  templateUrl: './ssh-actions.component.html',
  styleUrls: ['./ssh-actions.component.scss']
})
export class SshActionsComponent implements OnInit {
  @Input() application: Application;

  activeConnection: string;

  constructor(private Ssh: SshService) { }

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
