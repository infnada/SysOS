import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'aasftp-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  connections: SftpConnection[];
  activeConnection: string;
  viewExchange: boolean;

  constructor(private Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit(): void {

    // Listen for connections changes
    this.Sftp.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: SftpConnection[]) => this.connections = connections);

    // Listen for activeConnection change
    this.Sftp.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnection = activeConnectionUuid);

    // Listen for viewExchange change
    this.Sftp.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: SftpConnection): void {
    this.Sftp.setActiveConnection(connection.uuid);
  }
}
