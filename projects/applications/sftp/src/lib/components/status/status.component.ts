import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {ConnectionSftp} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSftpService} from '../../services/anyopsos-app-sftp.service';

@Component({
  selector: 'aasftp-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnDestroy, OnInit {
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string;

  constructor(private readonly Sftp: AnyOpsOSAppSftpService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.Sftp.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionSftp> {
    return this.Sftp.activeConnection;
  }
}
