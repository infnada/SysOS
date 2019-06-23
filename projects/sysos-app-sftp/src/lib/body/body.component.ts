import {Component, OnInit, Input} from '@angular/core';

import {Application} from '@sysos/libs-application';

import {SysosAppSftpService} from '../services/sysos-app-sftp.service';
import {SftpConnection} from '../types/sftp-connection';

@Component({
  selector: 'sasftp-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() application: Application;

  connections: SftpConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private Sftp: SysosAppSftpService) {
  }

  ngOnInit() {
    this.Sftp.connections.subscribe(connections => this.connections = connections);
    this.Sftp.activeConnection.subscribe(connection => this.activeConnection = connection);
    this.Sftp.viewExchange.subscribe(view => this.viewExchange = view);
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: SftpConnection): void {
    this.Sftp.setActiveConnection(connection.uuid);
  }
}
