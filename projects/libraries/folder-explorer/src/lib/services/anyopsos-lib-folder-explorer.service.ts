import {Injectable, ViewContainerRef} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {AnyOpsOSFile} from '@anyopsos/backend-core/app/types/anyopsos-file';
import {Connection} from '@anyopsos/backend-core/app/types/connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibFolderExplorerService {
  private readonly subjectGoPathBack: Subject<void> = new Subject();
  private readonly subjectLoadingData: Subject<boolean> = new Subject();

  private readonly $currentPath: BehaviorSubject<string>;
  private readonly $currentData: BehaviorSubject<AnyOpsOSFile[]>;
  private readonly $viewAsList: BehaviorSubject<boolean>;
  private readonly $search: BehaviorSubject<{ fileName: string; }>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: AnyOpsOSFile[],
    viewAsList: boolean,
    search: { fileName: string; }
  };
  readonly currentPath: Observable<string>;
  readonly currentData: Observable<AnyOpsOSFile[]>;
  readonly viewAsList: Observable<boolean>;
  readonly search: Observable<{ fileName: string; }>;

  private bodyContainer: ViewContainerRef;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService) {

    this.dataStore = { currentPath: '/', currentData: [], viewAsList: false, search: { fileName: null } };
    this.$currentPath = new BehaviorSubject(this.dataStore.currentPath);
    this.$currentData = new BehaviorSubject(this.dataStore.currentData);
    this.$viewAsList = new BehaviorSubject(this.dataStore.viewAsList);
    this.$search = new BehaviorSubject(this.dataStore.search);
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  /**
   * Sets the bodyContainerRef, this is used by Modals
   */
  setBodyContainerRef(bodyContainer: ViewContainerRef): void {
    this.bodyContainer = bodyContainer;
  }

  getBodyContainerRef(): ViewContainerRef {
    return this.bodyContainer;
  }

  reloadPath(srcPath?: string, connection?: Connection): void {
    this.subjectLoadingData.next(true);

    this.LibFileSystemUi.UIgetFolder(
      (srcPath ? srcPath : this.dataStore.currentPath),
      (connection ? connection.type : null),
      (connection ? { connection: connection } : undefined)
    ).then((data: AnyOpsOSFile[]) => {
      this.dataStore.currentData = data;

      // broadcast data to subscribers
      this.$currentData.next(Object.assign({}, this.dataStore).currentData);

      if (srcPath) {
        this.dataStore.currentPath = srcPath;

        // broadcast data to subscribers
        this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
      }

      this.subjectLoadingData.next(false);
    });
  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this.$viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {fileName: data};

    // broadcast data to subscribers
    this.$search.next(Object.assign({}, this.dataStore).search);
  }

  /**
   * Observers
   */
  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<void> {
    return this.subjectGoPathBack.asObservable();
  }

  getObserverLoadingData(): Observable<boolean> {
    return this.subjectLoadingData.asObservable();
  }
}
