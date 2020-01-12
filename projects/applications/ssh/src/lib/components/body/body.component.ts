import {Component, Input, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Socket} from 'ngx-socket-io';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';
import {SshConnection} from '../../types/ssh-connection';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'aassh-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: SshConnection[];
  activeConnection: string;

  terminalUuid: string = null;
  customTerminalMessage: string = null;

  constructor(private socket: Socket,
              private Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Listen for connections change
    this.Ssh.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: SshConnection[]) => this.connections = connections);

    // Listen for activeConnection change
    this.Ssh.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => {
        if (activeConnectionUuid) this.terminalUuid = this.Ssh.getTerminalMap(activeConnectionUuid);

        this.activeConnection = activeConnectionUuid;
      });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
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

  terminalUuidChanged(terminalUuid: string): void {
    this.terminalUuid = terminalUuid;

    this.customTerminalMessage = 'Getting a Shell from SSH connection';

    this.Ssh.setTerminalMap(this.activeConnection, terminalUuid);

    this.socket.emit('[ssh-shell]', {
      connectionUuid: this.activeConnection,
      terminalUuid
    }, (shellState: { status: 'error' | 'ok'; data: any; }) => {
      if (shellState.status === 'error') return this.customTerminalMessage = shellState.data;
      this.customTerminalMessage = null;
    });
  }

}
