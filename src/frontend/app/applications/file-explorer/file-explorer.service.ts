import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

import {FileSystemService} from "../../services/file-system.service";

import {File} from "../../interfaces/file";

@Injectable({
  providedIn: 'root'
})
export class FileExplorerService {

  private _currentPath: BehaviorSubject<string>;
  private _currentData: BehaviorSubject<File[]>;
  private dataStore: {  // This is where we will store our data in memory
    currentPath: string,
    currentData: File[]
  };
  currentPath: Observable<any>;
  currentData: Observable<any>;

  constructor(private FileSystemService: FileSystemService) {
    this.dataStore = {currentPath: '/', currentData: []};
    this._currentPath = <BehaviorSubject<string>>new BehaviorSubject('/');
    this._currentData = <BehaviorSubject<File[]>>new BehaviorSubject([]);
    this.currentPath = this._currentPath.asObservable();
    this.currentData = this._currentData.asObservable();
  }

  reloadPath(path?: string): void {
    this.FileSystemService.getFileSystemPath((path ? path : this.dataStore.currentPath)).subscribe(
      (res: File[]) => {
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

  private subjectGoPathBack = new Subject<any>();

  sendGoPathBack(): void {
    this.subjectGoPathBack.next();
  }

  getObserverGoPathBack(): Observable<any> {
    return this.subjectGoPathBack.asObservable();
  }

  private subjectGoToPath = new Subject<any>();

  sendGoToPath(path: string): void {
    this.subjectGoToPath.next(path);
  }

  getObserverGoToPath(): Observable<any> {
    return this.subjectGoToPath.asObservable();
  }

}
