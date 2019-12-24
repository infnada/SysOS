import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSFile} from '@anyopsos/lib-types';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppFileExplorerService {
  private subjectGoPathBack: Subject<void> = new Subject();
  private subjectLoadingData: Subject<boolean> = new Subject();

  private $currentPath: BehaviorSubject<string>;
  private $currentData: BehaviorSubject<AnyOpsOSFile[]>;
  private $viewAsList: BehaviorSubject<boolean>;
  private $search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: AnyOpsOSFile[],
    viewAsList: boolean,
    search: { filename: string; }
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private FileSystem: AnyOpsOSLibFileSystemService) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: {filename: null}};
    this.$currentPath = new BehaviorSubject(this.dataStore.currentPath);
    this.$currentData = new BehaviorSubject(this.dataStore.currentData);
    this.$viewAsList = new BehaviorSubject(this.dataStore.viewAsList);
    this.$search = new BehaviorSubject(this.dataStore.search);
    this.currentPath = this.$currentPath.asObservable();
    this.currentData = this.$currentData.asObservable();
    this.viewAsList = this.$viewAsList.asObservable();
    this.search = this.$search.asObservable();
  }

  reloadPath(path?: string): void {
    const loggerArgs = arguments;

    this.subjectLoadingData.next(true);

    this.FileSystem.getFileSystemPath(null, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: { data: AnyOpsOSFile[] }) => {
        this.dataStore.currentData = res.data;

        // broadcast data to subscribers
        this.$currentData.next(Object.assign({}, this.dataStore).currentData);

        if (path) {
          this.dataStore.currentPath = path;

          // broadcast data to subscribers
          this.$currentPath.next(Object.assign({}, this.dataStore).currentPath);
        }

        this.subjectLoadingData.next(false);
      },
      error => {
        this.logger.error('File Explorer', 'Error while getting fileSystemPath', loggerArgs, error);
        this.subjectLoadingData.next(false);
      });
  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this.$viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {filename: data};

    // broadcast data to subscribers
    this.$search.next(Object.assign({}, this.dataStore).search);
  }

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
