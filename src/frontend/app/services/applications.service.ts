import {Injectable, Injector, SystemJsNgModuleLoader, NgModuleFactory} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {FileSystemService} from './file-system.service';

import {Application} from '../interfaces/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private subjectCloseApplication = new Subject<any>();
  private subjectToggleApplication = new Subject<any>();

  private _applications: BehaviorSubject<Application[]>;
  private _taskBarApplications: BehaviorSubject<Application[]>;
  private _openedApplications: BehaviorSubject<Application[]>;
  private _taskbar__item_open: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    applications: Application[],
    taskBarApplications: Application[],
    openedApplications: Application[],
    taskbar__item_open: string
  };
  applications: Observable<any>;
  taskBarApplications: Observable<any>;
  openedApplications: Observable<any>;
  taskbar__item_open: Observable<any>;

  currentHoverApplication: string = null;

  constructor(private loader: SystemJsNgModuleLoader,
              private injector: Injector,
              private http: HttpClient,
              private toastr: ToastrService,
              private FileSystemService: FileSystemService) {
    this.dataStore = {taskBarApplications: [], openedApplications: [], applications: [], taskbar__item_open: null};
    this._applications = <BehaviorSubject<Application[]>> new BehaviorSubject([]);
    this._taskBarApplications = <BehaviorSubject<Application[]>> new BehaviorSubject([]);
    this._openedApplications = <BehaviorSubject<Application[]>> new BehaviorSubject([]);
    this._taskbar__item_open = <BehaviorSubject<string>> new BehaviorSubject(null);
    this.taskBarApplications = this._taskBarApplications.asObservable();
    this.openedApplications = this._openedApplications.asObservable();
    this.applications = this._applications.asObservable();
    this.taskbar__item_open = this._taskbar__item_open.asObservable();
  }


  /**
   * @Description
   * Check if application is in Desktop Task Bar
   */
  isApplicationInTaskBar(id: string): boolean {
    if (!id) throw new Error('id_not_found');

    return this.dataStore.taskBarApplications.map(e => {
      return e.id;
    }).indexOf(id) !== -1;
  }

  /**
   * @Description
   * Get application index in Desktop Task Bar
   */
  getApplicationIndexInTaskBar(id: string): number {
    if (!id) throw new Error('id_not_found');

    return this.dataStore.taskBarApplications.map(e => {
      return e.id;
    }).indexOf(id);
  }

  /**
   * @Description
   * Check if application is opened
   */
  isApplicationOpened(id: string): boolean {
    if (!id) throw new Error('id_not_found');

    return this.dataStore.openedApplications.map(e => {
      return e.id;
    }).indexOf(id) !== -1;
  }

  /**
   * @description
   * Main error handler
   */
  errorHandler(e: any): Error {
    if (!e) throw new Error('e_not_found');

    this.toastr.error(e, 'General Error');
    console.error('Applications Factory -> General Error -> [%s]', e);
    return new Error(e);
  }

  /**
   * @Description
   * If and application is not registered it will not be accessible from Desktop or other applications
   */
  registerApplication(data: Application): void {
    if (!data) throw new Error('data_not_found');

    console.debug('Applications Factory -> New application registration -> id [%s], name [%s]', data.id, data.name);

    this.dataStore.applications.push(data);

    // broadcast data to subscribers
    this._applications.next(Object.assign({}, this.dataStore).applications);
  }

  /**
   * @Description
   * Set an application to be shown in Desktop Task Bar
   */
  registerTaskBarApplication(data: Application, save?: boolean): void {
    if (!data) throw new Error('id_not_found');

    console.debug('Applications Factory -> Registering application in TaskBar -> id [%s], pinned [%s], save [%s]', data.id, data.pinned, save);

    const application_index = this.getApplicationIndexInTaskBar(data.id);

    // Applications already in Task Bar
    if (this.isApplicationInTaskBar(data.id)) {

      // Delete if unpin application and is not opened
      if (data.pinned === false && !this.isApplicationOpened(data.id)) {
        this.dataStore.taskBarApplications.splice(application_index, 1);
      } else {

        // Pin or unpin opened application application
        this.dataStore.taskBarApplications[application_index].pinned = data.pinned;
      }

    } else {

      console.debug('Applications Factory -> Register application in TaskBar -> id [%s], pinned [%s]', data.id, data.pinned);

      // Application not in Task Bar
      this.dataStore.taskBarApplications.push(data);
    }

    // broadcast data to subscribers
    this._taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);

    // Save new config to file
    if (save === true) {
      this.saveTaskBarApplicationsOrder();
    }
  }

  /**
   * @Description
   * Return all application info
   */
  getApplicationById(id: string): Application {
    if (!id) throw new Error('id_not_found');

    return this.dataStore.applications.filter(obj => {
      return obj.id === id;
    })[0];
  }

  /**
   * @Description
   * Closes an application
   */
  closeApplication(id: string): void {
    if (!id) throw new Error('id_not_found');

    console.debug('Applications Factory -> Closing application -> id [%s]', id);

    // Delete application object
    this.dataStore.openedApplications = this.dataStore.openedApplications.filter(el => {
      return el.id !== id;
    });

    // Remove from Desktop Task Bar
    this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter(el => {
      return el.id !== id || el.pinned === true;
    });

    // broadcast data to subscribers
    this._openedApplications.next(Object.assign({}, this.dataStore).openedApplications);
    this._taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);
  }

  /**
   * @Description
   * Opens a new application
   */
  openApplication(id: string, init_data?: any): void {
    if (!id) throw new Error('id_not_found');

    let app;

    console.debug('Applications Factory -> Opening application -> id [%s]', id);

    // If app is not an object get all application data
    if (typeof id === 'string') {
      app = this.getApplicationById(id);
    }

    app.init_data = init_data;

    // Check if application is already opened
    if (this.isApplicationOpened(app.id)) return;

    // Application not in pinned list. Show it on Desktop Task Bar
    if (!this.isApplicationInTaskBar(app.id)) {
      this.registerTaskBarApplication(app);
    }

    // Create a new instance of the application
    this.dataStore.openedApplications.push(app);

    // broadcast data to subscribers
    this._openedApplications.next(Object.assign({}, this.dataStore).openedApplications);
  }

  /**
   * @Description
   * Check if application is active (not in background) on Desktop
   */
  isActiveApplication(id: string): boolean {
    if (!id) throw new Error('id_not_found');

    return this.dataStore.taskbar__item_open === id;
  }

  /**
   * @Description
   * Set the current application where the mouse is in
   */
  setCurrentHoverApplication(app: string): void {
    this.currentHoverApplication = app;
  }

  /**
   * @Description
   * Puts an application active or at background
   */
  toggleApplication(id: string | null): void {
    if (typeof id !== 'string' && id !== null) throw new Error('error_id');

    if (id === null) {
      this.dataStore.taskbar__item_open = null;
    } else if (this.isActiveApplication(id)) {
      this.dataStore.taskbar__item_open = null;
    } else {
      this.dataStore.taskbar__item_open = id;
    }

    // broadcast data to subscribers
    this._taskbar__item_open.next(Object.assign({}, this.dataStore).taskbar__item_open);
  }

  /**
   * @Description
   * Check if application is pinned in Task Bar
   */
  isApplicationPinned(id: string): boolean {
    if (!id) throw new Error('id_not_found');

    const application = this.dataStore.taskBarApplications.filter(obj => {
      return obj.id === id;
    })[0];

    if (application) return application.pinned;
    return false;
  }

  /**
   * @description
   * Returns all scripts to load as SysOS applications
   */
  getInstalledApplications(): Promise<null> {

    return new Promise((resolve, reject) => {

      this.dataStore.applications.push({id: 'start', ico: 'windows', name: 'Start Menu', menu: true});

      // broadcast data to subscribers
      this._applications.next(Object.assign({}, this.dataStore).applications);

      this.FileSystemService.getFileSystemPath(null, '/bin/applications').subscribe(
        (res: { filename: string }[]) => {
          console.debug('Applications Factory -> Get Installed Applications successfully');

          res = [
            {
              filename: 'alerts-module.js'
            },
            {
              filename: 'backups-manager-module.js'
            },
            {
              filename: 'credentials-manager-module.js'
            },
            {
              filename: 'datastore-explorer-module.js'
            },
            {
              filename: 'file-explorer-module.js'
            },
            {
              filename: 'infrastructure-manager-module.js'
            },
            {
              filename: 'notepad-module.js'
            },
            {
              filename: 'sftp-module.js'
            },
            {
              filename: 'ssh-module.js'
            },
            {
              filename: 'wmks-module.js'
            },
          ];

          // Register every application
          return Promise.all(
            res.map((application) => this.loadApplication(application))
          ).then(() => {
            return resolve();
          });

        },
        error => {
          console.error('Applications Factory -> Error while getting installed applications -> ', error);
          console.error(error);
          return reject();
        });

    });

  }

  /**
   * @description
   * Loads an application module
   */
  loadApplication(application: { filename: string }) {

    return new Promise((resolve) => {
      const module = application.filename.replace('-module.js', '');
      let moduleCamel = application.filename
        .toLowerCase()
        .replace('.js', '')
        .replace(/-(.)/g, (match, group1) => {
          return group1.toUpperCase();
        });

      moduleCamel = moduleCamel.charAt(0).toUpperCase() + moduleCamel.slice(1);

      const modulePath = 'src/frontend/app/applications/' + module + '/' + module + '.module#' + moduleCamel;

      this.loader.load(modulePath)  // load the module and its components
        .then((modFac: NgModuleFactory<any>) => {

          modFac.create(this.injector);

          // Set factory to use in future
          this.dataStore.applications.filter((el: Application) => {
            return el.id === module;
          })[0].factory = modFac;

          return resolve();
        });
    });

  }

  /**
   * @description
   * Returns all pinned applications
   */
  getTaskBarApplications(): void {
    this.FileSystemService.getConfigFile('desktop/task_bar.json').subscribe(
      (res: { id: string }[]) => {
        console.debug('Applications Factory -> Get TaskBar Applications successfully');

        // Register Start button
        this.registerTaskBarApplication({id: 'start', pinned: true});

        // Register every pinned application
        res.forEach(application => {
          this.registerTaskBarApplication(application);
        });
      },
      error => {
        console.error('Applications Factory -> Error while getting TaskBar applications -> ', error);
        console.error(error);
      });
  }

  /**
   * @description
   * Function called after Sort taskbar applications
   */
  saveTaskBarApplicationsOrder(): void {
    const applications_to_save = this.dataStore.taskBarApplications.filter(obj => {
      return obj.pinned === true && obj.id !== 'start';
    });

    this.FileSystemService.saveConfigFile(applications_to_save, 'desktop/task_bar.json', true).subscribe(
      () => {
        console.debug('Applications Factory -> TaskBar applications saved');
      },
      error => {
        console.error(error);
        console.debug('Applications Factory -> Error while saving TaskBar applications -> ', error);
      });
  }

  sendCloseApplication(application: Application): void {
    this.subjectCloseApplication.next(application);
  }

  getObserverCloseApplication(): Observable<any> {
    return this.subjectCloseApplication.asObservable();
  }

  sendToggleApplication(id: string): void {
    this.subjectToggleApplication.next(id);
  }

  getObserverToggleApplication(): Observable<any> {
    return this.subjectToggleApplication.asObservable();
  }

}
