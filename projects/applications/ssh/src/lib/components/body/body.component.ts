import {Component, Input, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibSshService, AnyOpsOSLibSshHelpersService, AnyOpsOSLibSshConnectionsStateService} from '@anyopsos/lib-ssh';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'aassh-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: ConnectionSsh[];
  activeConnectionUuid: string;

  terminalUuid: string = null;
  customTerminalMessage: string = null;

  constructor(private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly LibSsh: AnyOpsOSLibSshService,
              private readonly Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.LibSshHelpers.getAllConnectionsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: (ConnectionSsh | ConnectionSftp)[]) => {

      const sshConnections: ConnectionSsh[] = connections.filter((connection: ConnectionSsh | ConnectionSftp) => connection.type === 'ssh') as ConnectionSsh[];
      this.onConnectionsChange(sshConnections);
    });

    // Set bodyContainerRef, this is used by Modals
    this.Ssh.setBodyContainerRef(this.bodyContainer);

    // Listen for activeConnectionUuid change
    this.Ssh.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.onActiveConnectionChange(activeConnectionUuid));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onConnectionsChange(connections: ConnectionSsh[]): void {
    this.connections = connections;
    this.Ssh.connectionsUpdated();
  }

  private onActiveConnectionChange(activeConnectionUuid: string | null): void {

    // Set current terminalUuid & activeConnectionUuid
    if (activeConnectionUuid) this.terminalUuid = this.Ssh.getTerminalMap(activeConnectionUuid);
    this.activeConnectionUuid = activeConnectionUuid;
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  /**
   * Setter & Getter of ActiveConnectionUuid
   */
  setActiveConnectionUuid(connectionUuid: string = null): void {
    this.Ssh.setActiveConnectionUuid(connectionUuid);
  }

  getActiveConnectionObs(): Observable<ConnectionSsh | null> {
    return this.Ssh.activeConnection;
  }

  /**
   * Emitted by <alterm-terminal> when a terminal is created
   */
  terminalUuidChanged(terminalUuid: string): void {
    this.terminalUuid = terminalUuid;

    this.customTerminalMessage = 'Getting a Shell from SSH connection';

    this.Ssh.setTerminalMap(this.activeConnectionUuid, terminalUuid);

    // Create new SSH Shell
    this.LibSsh.socketCreateShell(this.activeConnectionUuid, terminalUuid).then(() => {
      this.customTerminalMessage = null;

      this.LibSshConnectionsState.patchConnection(this.activeConnectionUuid, 'state', 'ready')
    }).catch((e: string) => {
      this.customTerminalMessage = e;
    });
  }

}
