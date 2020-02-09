import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';
import {ConnectionSsh} from '@anyopsos/module-ssh';

import {AnyOpsOSAppSshService} from '../../services/anyopsos-app-ssh.service';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

@Component({
  selector: 'aassh-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnDestroy, OnInit {
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  activeConnectionUuid: string | null;

  constructor(private readonly Ssh: AnyOpsOSAppSshService) {
  }

  ngOnInit(): void {

    // Listen for activeConnectionUuid change
    this.Ssh.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  getActiveConnectionObs(): Observable<ConnectionSsh | null> {
    return this.Ssh.activeConnection;
  }

}
