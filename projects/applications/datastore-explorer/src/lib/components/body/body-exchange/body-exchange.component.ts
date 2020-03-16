import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService, SendFileExchange} from '@anyopsos/lib-file-system-ui';

import {AnyOpsOSAppDatastoreExplorerService} from '../../../services/anyopsos-app-datastore-explorer.service';

@Component({
  selector: 'aade-body-exchange',
  templateUrl: './body-exchange.component.html',
  styleUrls: ['./body-exchange.component.scss']
})
export class BodyExchangeComponent implements OnDestroy, OnInit {
  private readonly destroySubject$: Subject<void> = new Subject();

  private activeConnectionObjectUuid: string | null;

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
              private readonly DatastoreExplorer: AnyOpsOSAppDatastoreExplorerService) {

  }

  ngOnInit(): void {

    // Listen for viewExchange change
    this.DatastoreExplorer.viewExchange
      .pipe(takeUntil(this.destroySubject$)).subscribe((view: boolean) => this.viewExchange = view);

    // Listen for activeConnection change
    this.DatastoreExplorer.activeConnectionObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionObjectUuid: string | null) => this.activeConnectionObjectUuid = activeConnectionObjectUuid);

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
