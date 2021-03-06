import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../types/sftp-connection';

@Component({
  selector: 'sasftp-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  connections: SftpConnection[];
  activeConnection: string;
  viewExchange: boolean;

  viewSide: boolean = true;

  constructor(private Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit(): void {
    this.Sftp.connections.pipe(takeUntil(this.destroySubject$)).subscribe(connections => this.connections = connections);
    this.Sftp.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(connection => this.activeConnection = connection);
    this.Sftp.viewExchange.pipe(takeUntil(this.destroySubject$)).subscribe(view => this.viewExchange = view);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connection: SftpConnection): void {
    this.Sftp.setActiveConnection(connection.uuid);
  }
}
