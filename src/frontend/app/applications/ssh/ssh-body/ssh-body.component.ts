import {Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {Terminal} from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';

import {Application} from '../../../interfaces/application';
import {SshService} from '../ssh.service';
import {SshConnection} from '../SshConnection';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-ssh-body',
  templateUrl: './ssh-body.component.html',
  styleUrls: ['./ssh-body.component.scss']
})
export class SshBodyComponent implements OnInit {
  @Input() application: Application;

  private terminalContainer: ElementRef;
  private currentTerminal: Terminal;
  @ViewChild('terminalContainer') set content(content: ElementRef) {
    this.terminalContainer = content;

    if (!this.activeConnection) return;

    this.currentTerminal = this.Ssh.getSshTerminal(this.activeConnection);

    if (!this.terminalContainer) return;

    this.currentTerminal.open(this.terminalContainer.nativeElement);

    this.onBodyResize();
  }

  connections: SshConnection[];
  activeConnection: string;

  viewSide: boolean = true;

  constructor(private Ssh: SshService,
              private socket: Socket) {
  }

  ngOnInit() {
    this.Ssh.connections.subscribe(connections => this.connections = connections);
    this.Ssh.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
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

  onBodyResize(): void {
    fit.fit(this.currentTerminal);
    this.socket.emit('ssh_session__geometry', {
      cols: this.currentTerminal.cols,
      rows: this.currentTerminal.rows,
      uuid: this.activeConnection
    });
  }

}
