import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {FileSystemService} from '../../services/file-system.service';

import {SysOSFile} from '../../interfaces/file';

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {
  private subjectGoPathBack = new Subject<any>();

  private _currentPath: BehaviorSubject<string>;
  private _currentData: BehaviorSubject<SysOSFile[]>;
  private _viewAsList: BehaviorSubject<boolean>;
  private _search: BehaviorSubject<object>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: SysOSFile[],
    viewAsList: boolean,
    search: {filename: string}
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;
  viewAsList: Observable<any>;
  search: Observable<any>;

  constructor(private FileSystemService: FileSystemService) {
    this.dataStore = {currentPath: '/', currentData: [], viewAsList: false, search: null};
    this._currentPath = <BehaviorSubject<string>> new BehaviorSubject('/');
    this._currentData = <BehaviorSubject<SysOSFile[]>> new BehaviorSubject([]);
    this._viewAsList = <BehaviorSubject<boolean>> new BehaviorSubject(false);
    this._search = <BehaviorSubject<object>> new BehaviorSubject({filename: null});
    this.currentPath = this._currentPath.asObservable();
    this.currentData = this._currentData.asObservable();
    this.viewAsList = this._viewAsList.asObservable();
    this.search = this._search.asObservable();
  }

  reloadPath(path?: string): void {
    this.FileSystemService.getFileSystemPath(null, (path ? path : this.dataStore.currentPath)).subscribe(
      (res: SysOSFile[]) => {
        this.dataStore.currentData = res;

        // broadcast data to subscribers
        this._currentData.next(Object.assign({}, this.dataStore).currentData);

        if (path) {
          this.dataStore.currentPath = path;

          // broadcast data to subscribers
          this._currentPath.next(Object.assign({}, this.dataStore).currentPath);
        }
      },
      error => {
        console.error('File Explorer -> Error while getting fileSystemPath -> ', error);
        console.error(error);
      });
  }

  toggleView(): void {
    this.dataStore.viewAsList = !this.dataStore.viewAsList;

    // broadcast data to subscribers
    this._viewAsList.next(Object.assign({}, this.dataStore).viewAsList);
  }

  setSearch(data: string): void {
    this.dataStore.search = {filename: data};

    // broadcast data to subscribers
    this._search.next(Object.assign({}, this.dataStore).search);
  }

  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<any> {
    return this.subjectGoPathBack.asObservable();
  }

}
