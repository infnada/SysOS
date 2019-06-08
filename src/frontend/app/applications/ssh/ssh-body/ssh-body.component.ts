import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {FitAddon} from 'xterm-addon-fit';

import {Application} from '../../../interfaces/application';
import {SshService} from '../ssh.service';
import {SshConnection} from '../SshConnection';

@Component({
  selector: 'app-ssh-body',
  templateUrl: './ssh-body.component.html',
  styleUrls: ['./ssh-body.component.scss']
})
export class SshBodyComponent implements OnInit {
  @Input() application: Application;
  @ViewChild('terminalContainer') terminalContainer: ElementRef;

  connections: SshConnection[];
  activeConnection: string;

  viewSide: boolean = true;

  constructor(private Ssh: SshService,
              private socket: Socket) {
  }

  ngOnInit() {
    this.Ssh.connections.subscribe(connections => this.connections = connections);
    this.Ssh.activeConnection.subscribe(activeConnection => {
      this.activeConnection = activeConnection;

      if (!activeConnection) return;

      const currentTerminal: any = this.Ssh.getSshTerminal(activeConnection);
      currentTerminal.loadAddon(new FitAddon());
      currentTerminal.open(this.terminalContainer.nativeElement, {
        focus: true
      });
      currentTerminal.fit();

      this.socket.emit('ssh_session__geometry', {
        cols: currentTerminal.cols,
        rows: currentTerminal.rows,
        uuid: activeConnection
      });
    });
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: SshConnection): void {
    this.Ssh.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): SshConnection {
    return this.Ssh.getActiveConnection();
  }

}
