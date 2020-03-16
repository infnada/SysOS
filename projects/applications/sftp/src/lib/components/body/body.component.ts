import {Component, OnInit, Input, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibSshHelpersService} from '@anyopsos/lib-ssh';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';

@Component({
  selector: 'aasftp-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: ConnectionSftp[];
  activeConnectionUuid: string | null;
  viewExchange: boolean;

  constructor(private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.LibSshHelpers.getAllConnectionsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: (ConnectionSsh | ConnectionSftp)[]) => {

        const sftpConnections: ConnectionSftp[] = connections.filter((connection: ConnectionSsh | ConnectionSftp) => connection.type === 'sftp') as ConnectionSftp[];
        this.onConnectionsChange(sftpConnections);
    });

    // Set bodyContainerRef, this is used by Modals
    this.Sftp.setBodyContainerRef(this.bodyContainer);

    // Listen for activeConnectionUuid change
    this.Sftp.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);

    // Listen for viewExchange change
    this.Sftp.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onConnectionsChange(connections: ConnectionSftp[]): void {
    this.connections = connections;
    this.Sftp.connectionsUpdated();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: ConnectionSftp): void {
    this.Sftp.setActiveConnectionUuid(connection.uuid);
  }
}
