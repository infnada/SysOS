import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService, SendFileExchange} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

@Component({
  selector: 'aasftp-body-exchange',
  templateUrl: './body-exchange.component.html',
  styleUrls: ['./body-exchange.component.scss']
})
export class BodyExchangeComponent implements OnDestroy, OnInit {
  private readonly destroySubject$: Subject<void> = new Subject();

  private activeConnectionUuid: string | null;

  viewExchange: boolean;
  filesExchange: {
    uuid: string,
    name: string,
    source: string,
    path: string,
    size: number,
    progress: number,
    exchange: string
  }[] = [];

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService,
              private readonly Sftp: AnyOpsOSAppSftpService) {

  }

  ngOnInit(): void {

    // Listen for viewExchange change
    this.Sftp.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);

    // Listen for activeConnection change
    this.Sftp.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);

    /**
     * Uploads & Downloads observer
     */
    this.LibFileSystemUi.getObserverSendFileExchange()
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: SendFileExchange) => this.onSendFileExchange(data));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  /**
   * Uploads & Downloads observer
   */
  private onSendFileExchange(data: SendFileExchange): void {
    this.logger.debug('LibFolderExplorer', 'onSendFileExchange', arguments);
  }
}
