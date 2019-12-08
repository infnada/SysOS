import {Injectable, Injector, Compiler, NgModuleFactory} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, BehaviorSubject, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';

import {Application} from './types/application';

declare const SystemJS: any;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibApplicationService {
  private subjectCloseApplication: Subject<Application> = new Subject();
  private subjectToggleApplication: Subject<string> = new Subject();

  private $applications: BehaviorSubject<Application[]>;
  private $taskBarApplications: BehaviorSubject<Application[]>;
  private $openedApplications: BehaviorSubject<Application[]>;
  private $taskbarItemOpen: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    applications: Application[],
    taskBarApplications: Application[],
    openedApplications: Application[],
    taskbarItemOpen: string
  };
  applications: Observable<any>;
  taskBarApplications: Observable<any>;
  openedApplications: Observable<any>;
  taskbarItemOpen: Observable<any>;

  currentHoverApplication: string = null;

  constructor(private logger: AnyOpsOSLibLoggerService,
              private compiler: Compiler,
              private injector: Injector,
              private http: HttpClient,
              private Toastr: ToastrService,
              private FileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = {taskBarApplications: [], openedApplications: [], applications: [], taskbarItemOpen: null};
    this.$applications = new BehaviorSubject(this.dataStore.taskBarApplications);
    this.$taskBarApplications = new BehaviorSubject(this.dataStore.openedApplications);
    this.$openedApplications = new BehaviorSubject(this.dataStore.applications);
    this.$taskbarItemOpen = new BehaviorSubject(this.dataStore.taskbarItemOpen);
    this.taskBarApplications = this.$taskBarApplications.asObservable();
    this.openedApplications = this.$openedApplications.asObservable();
    this.applications = this.$applications.asObservable();
    this.taskbarItemOpen = this.$taskbarItemOpen.asObservable();
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

    this.Toastr.error(e, 'General Error');
    this.logger.error('Applications', 'General Error', null, e);
    return new Error(e);
  }

  /**
   * @Description
   * If and application is not registered it will not be accessible from Desktop or other applications
   */
  registerApplication(data: Application): void {
    if (!data) throw new Error('data_not_found');

    this.logger.debug('Applications', 'New application registration', arguments);

    this.dataStore.applications.push(data);

    // broadcast data to subscribers
    this.$applications.next(Object.assign({}, this.dataStore).applications);
  }

  /**
   * @Description
   * Set an application to be shown in Desktop Task Bar
   */
  registerTaskBarApplication(data: Application, save?: boolean): void {
    if (!data) throw new Error('id_not_found');

    this.logger.trace('Applications', 'Registering application in TaskBar', arguments,
      data.id, data.pinned, save);

    const applicationIndex = this.getApplicationIndexInTaskBar(data.id);

    // Applications already in Task Bar
    if (this.isApplicationInTaskBar(data.id)) {

      // Delete if unpin application and is not opened
      if (data.pinned === false && !this.isApplicationOpened(data.id)) {
        this.dataStore.taskBarApplications.splice(applicationIndex, 1);
      } else {

        // Pin or unpin opened application application
        this.dataStore.taskBarApplications[applicationIndex].pinned = data.pinned;
      }

    } else {

      this.logger.trace('Applications', 'Register application in TaskBar', arguments);

      // Application not in Task Bar
      this.dataStore.taskBarApplications.push(data);
    }

    // broadcast data to subscribers
    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);

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

    this.logger.debug('Applications', 'Closing application', arguments);

    // Delete application object
    this.dataStore.openedApplications = this.dataStore.openedApplications.filter(el => {
      return el.id !== id;
    });

    // Remove from Desktop Task Bar
    this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter(el => {
      return el.id !== id || el.pinned === true;
    });

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);
    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);
  }

  /**
   * @Description
   * Opens a new application
   */
  openApplication(id: string, initData?: any): void {
    if (!id) throw new Error('id_not_found');

    let app;

    this.logger.debug('Applications', 'Opening application', arguments);

    // If app is not an object get all application data
    if (typeof id === 'string') {
      app = this.getApplicationById(id);
    }

    app.initData = initData;

    // Check if application is already opened
    if (this.isApplicationOpened(app.id)) return;

    // Application not in pinned list. Show it on Desktop Task Bar
    if (!this.isApplicationInTaskBar(app.id)) {
      this.registerTaskBarApplication(app);
    }

    // Create a new instance of the application
    this.dataStore.openedApplications.push(app);

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);

    // Emitting to application directives (minimize or maximize)
    // setTimeout is needed to make sure application is initialized and subscribed to toggle event
    setTimeout(() => {
      this.sendToggleApplication(app.id);
    }, 0);
  }

  /**
   * @Description
   * Check if application is active (not in background) on Desktop
   */
  isActiveApplication(id: string): boolean {
    if (typeof id !== 'string' && id !== null) throw new Error('id_not_found');

    return this.dataStore.taskbarItemOpen === id;
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
      this.dataStore.taskbarItemOpen = null;
    } else if (this.isActiveApplication(id)) {
      this.dataStore.taskbarItemOpen = null;
    } else {
      this.dataStore.taskbarItemOpen = id;
    }

    // broadcast data to subscribers
    this.$taskbarItemOpen.next(Object.assign({}, this.dataStore).taskbarItemOpen);
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
   * Returns all scripts to load as anyOpsOS applications
   */
  getInstalledApplications(): Promise<null> {

    return new Promise((resolve, reject) => {

      this.dataStore.applications.push({id: 'start', ico: 'fab fa-windows', name: 'Start Menu', menu: true});

      // broadcast data to subscribers
      this.$applications.next(Object.assign({}, this.dataStore).applications);

      this.FileSystem.getFileSystemPath(null, '/bin/applications').subscribe(
        (res: { data: { filename: string }[] }) => {
          this.logger.info('Applications', 'Got Installed Applications successfully');

          // Register every application
          return Promise.all(
            res.data.map((application) => application.filename.endsWith('.umd.js') ? this.loadApplication(application) : null)
          ).then(() => {
            return resolve();
          });

        },
        error => {
          this.logger.error('Applications', 'Error while getting installed applications', null, error);
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
      let moduleCamel = application.filename
        .toLowerCase()
        .replace('.umd.js', '')
        .replace(/-(.)/g, (match, group1) => {
          return group1.toUpperCase();
        });

      moduleCamel = moduleCamel.charAt(0).toUpperCase() + moduleCamel.slice(1);

      SystemJS.import(`/api/file/${encodeURIComponent('/bin/applications/' + application.filename)}`).then((moduleToCompile) => {

        return this.compiler.compileModuleAsync<any>(moduleToCompile[moduleCamel.replace('Anyopsos', 'AnyOpsOS') + 'Module']);
      }).then((modFac: NgModuleFactory<any>) => {
        modFac.create(this.injector);

        // Set factory to use in future
        this.dataStore.applications.filter((el: Application) => {
          return el.id === application.filename.replace('.umd.js', '').replace('anyopsos-app-', '');
        })[0].factory = modFac;

        return resolve();
      });

      /*this.loader.load(modulePath)  // load the module and its components
        .then((modFac: NgModuleFactory<any>) => {

          modFac.create(this.injector);

          // Set factory to use in future
          this.dataStore.applications.filter((el: Application) => {
            return el.id === module;
          })[0].factory = modFac;

          return resolve();
        });*/
    });

  }

  /**
   * @description
   * Returns all pinned applications
   */
  getTaskBarApplications(): void {
    this.FileSystem.getConfigFile('desktop/task_bar.json').subscribe(
      (res: { id: string }[]) => {
        this.logger.info('Applications', 'Got TaskBar Applications successfully');

        // Register Start button
        this.registerTaskBarApplication({id: 'start', pinned: true});

        // Register every pinned application
        res.forEach(application => {
          this.registerTaskBarApplication(application);
        });
      },
      error => {
        this.logger.error('Applications', 'Error while getting TaskBar applications', null, error);
      });
  }

  /**
   * @description
   * Function called after Sort taskbar applications
   */
  saveTaskBarApplicationsOrder(): void {
    const applicationsToSave = this.dataStore.taskBarApplications.filter(obj => {
      return obj.pinned === true && obj.id !== 'start';
    });

    this.FileSystem.saveConfigFile(applicationsToSave, 'desktop/task_bar.json', true).subscribe(
      () => {
        this.logger.debug('Applications', 'TaskBar applications saved');
      },
      error => {
        this.logger.error('Applications', 'Error while saving TaskBar applications', null, error);
      });
  }

  sendCloseApplication(application: Application): void {
    this.subjectCloseApplication.next(application);
  }

  getObserverCloseApplication(): Observable<Application> {
    return this.subjectCloseApplication.asObservable();
  }

  sendToggleApplication(id: string): void {
    this.subjectToggleApplication.next(id);
  }

  getObserverToggleApplication(): Observable<any> {
    return this.subjectToggleApplication.asObservable();
  }
}
