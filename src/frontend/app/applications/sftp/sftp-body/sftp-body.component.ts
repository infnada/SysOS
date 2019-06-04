import {Component, OnInit, Input} from '@angular/core';
import {Application} from '../../../interfaces/application';
import {SftpService} from '../services/sftp.service';
import {SftpConnection} from '../SftpConnection';

@Component({
  selector: 'app-sftp-body',
  templateUrl: './sftp-body.component.html',
  styleUrls: ['./sftp-body.component.scss']
})
export class SftpBodyComponent implements OnInit {
  @Input() application: Application;

  connections: SftpConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private Sftp: SftpService) {
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
