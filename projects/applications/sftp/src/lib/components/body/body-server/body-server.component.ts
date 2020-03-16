import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';

@Component({
  selector: 'aasftp-body-server',
  templateUrl: './body-server.component.html',
  styleUrls: ['./body-server.component.scss']
})
export class BodyServerComponent implements OnDestroy, OnInit {
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string | null;

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.Sftp.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionSftp> {
    return this.Sftp.activeConnection;
  }
}
