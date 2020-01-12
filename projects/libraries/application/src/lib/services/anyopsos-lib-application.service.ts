import {Injectable, Injector, Compiler, NgModuleFactory} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, BehaviorSubject, Subject} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSFile} from '@anyopsos/backend/app/types/anyopsos-file';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {Application} from '../types/application';
import {TaskbarApplication} from '../types/taskbar-application';

declare const SystemJS: any;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibApplicationService {
  private subjectCloseApplication: Subject<Application> = new Subject();
  private subjectToggleApplication: Subject<string> = new Subject();

  private $applications: BehaviorSubject<Application[]>;
  private $taskBarApplications: BehaviorSubject<TaskbarApplication[]>;
  private $openedApplications: BehaviorSubject<Application[]>;
  private $taskbarItemOpen: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    applications: Application[],
    taskBarApplications: TaskbarApplication[],
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
              private FileSystem: AnyOpsOSLibFileSystemService) {

    this.dataStore = {taskBarApplications: [], openedApplications: [], applications: [], taskbarItemOpen: null};
    this.$applications = new BehaviorSubject(this.dataStore.applications);
    this.$taskBarApplications = new BehaviorSubject(this.dataStore.taskBarApplications);
    this.$openedApplications = new BehaviorSubject(this.dataStore.openedApplications);
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
  isApplicationInTaskBar(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.taskBarApplications.find((app: TaskbarApplication) => app.uuid === applicationUuid) !== undefined;
  }

  /**
   * @Description
   * Get application index in Desktop Task Bar
   */
  getApplicationIndexInTaskBar(applicationUuid: string): number {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.taskBarApplications.findIndex((app: TaskbarApplication) => app.uuid === applicationUuid);
  }

  /**
   * @Description
   * Check if application is opened
   */
  isApplicationOpened(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.openedApplications.find((app: Application) => app.uuid === applicationUuid) !== undefined;
  }

  /**
   * @description
   * Main error handler
   */
  // TODO remove?
  errorHandler(e: any): Error {
    if (!e) throw new Error('e_not_found');

    this.logger.error('Applications', 'General Error', null, e);
    return new Error(e);
  }

  /**
   * @Description
   * If and application is not registered it will not be accessible from Desktop or other applications
   */
  registerApplication(application: Application): void {
    if (!application) throw new Error('application_not_found');

    this.logger.debug('Applications', 'New application registration', arguments);

    this.dataStore.applications.push(application);

    // broadcast data to subscribers
    this.$applications.next(Object.assign({}, this.dataStore).applications);
  }

  /**
   * @Description
   * Set an application to be shown in Desktop Task Bar
   */
  registerTaskBarApplication(data: TaskbarApplication, save?: boolean): void {
    if (!data) throw new Error('id_not_found');

    this.logger.trace('Applications', 'Registering application in TaskBar', arguments);

    // Applications already in Task Bar
    if (this.isApplicationInTaskBar(data.uuid)) {

      // Delete if unpin application and is not opened
      if (data.pinned === false && !this.isApplicationOpened(data.uuid)) {
        this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter((app: TaskbarApplication) => app.uuid !== data.uuid);
      } else {

        // Pin or unpin opened application application
        const applicationIndex = this.getApplicationIndexInTaskBar(data.uuid);
        this.dataStore.taskBarApplications[applicationIndex].pinned = data.pinned;
      }

    } else {

      this.logger.trace('Applications', 'Register application in TaskBar', arguments);
      this.dataStore.taskBarApplications.push(data);
    }

    // broadcast data to subscribers
    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);

    // Save new config to file
    if (save === true) this.saveTaskBarApplicationsOrder();
  }

  /**
   * @Description
   * Return all application info
   */
  getApplicationById(applicationUuid: string): Application {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.applications.find(obj => obj.uuid === applicationUuid);
  }

  /**
   * @Description
   * Closes an application
   */
  closeApplication(applicationUuid: string): void {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    this.logger.debug('Applications', 'Closing application', arguments);

    // Delete application object
    this.dataStore.openedApplications = this.dataStore.openedApplications.filter(el => el.uuid !== applicationUuid);

    // Remove from Desktop Task Bar
    this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter(el => el.uuid !== applicationUuid || el.pinned === true);

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);
    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);
  }

  /**
   * @Description
   * Opens a new application
   */
  openApplication(applicationUuid: string, initData?: any): void {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    this.logger.debug('Applications', 'Opening application', arguments);

    // If app is not an object get all application data
    const app = this.getApplicationById(applicationUuid);
    app.initData = initData;

    // Check if application is already opened
    if (this.isApplicationOpened(app.uuid)) return;

    // Application not in pinned list. Show it on Desktop Task Bar
    if (!this.isApplicationInTaskBar(app.uuid)) {
      this.registerTaskBarApplication({uuid: app.uuid, pinned: false} as TaskbarApplication);
    }

    // Create a new instance of the application
    this.dataStore.openedApplications.push(app);

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);

    // Emitting to application directives (minimize or maximize)
    // setTimeout is needed to make sure application is initialized and subscribed to toggle event
    setTimeout(() => this.sendToggleApplication(app.uuid), 0);
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
  isApplicationPinned(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    const application = this.dataStore.taskBarApplications.find(obj => obj.uuid === applicationUuid);

    if (application) return application.pinned;
    return false;
  }

  /**
   * @description
   * Returns all scripts to load as anyOpsOS applications
   */
  getInstalledApplications(): Promise<void> {

    return new Promise((resolve, reject) => {

      this.dataStore.applications.push({uuid: 'start', ico: 'fab fa-windows', name: 'Start Menu', menu: true});

      // broadcast data to subscribers
      this.$applications.next(Object.assign({}, this.dataStore).applications);

      this.FileSystem.getFolder('/bin/applications').subscribe(
        (res: BackendResponse & { data: AnyOpsOSFile[] }) => {
          if (res.status === 'error') return this.logger.fatal('Applications', 'Error while getting Installed Applications', null, res.data);

          this.logger.info('Applications', 'Got Installed Applications successfully');

          // Register every application
          return Promise.all(
            res.data.map((application) => application.fileName.endsWith('.umd.js') ? this.loadApplication(application) : null)
          ).then(() => resolve());

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
  loadApplication(application: { fileName: string }) {

    return new Promise((resolve) => {

      SystemJS.import(`/api/file/${encodeURIComponent('/bin/applications/' + application.fileName)}`).then((moduleToCompile) => {

        // This will only work if the application exposes only one Module
        const applicationModule: string = Object.keys(moduleToCompile).find((entry: string) => entry.endsWith('Module'));
        return this.compiler.compileModuleAsync<any>(moduleToCompile[applicationModule]);

      }).then((modFac: NgModuleFactory<any>) => {
        modFac.create(this.injector);

        // Set factory to use in future
        this.dataStore.applications.filter((el: Application) => {
          return el.uuid === application.fileName.replace('.umd.js', '').replace('anyopsos-app-', '');
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
   *
   * @description
   * Returns all pinned applications
   */
  getTaskBarApplications(): void {
    this.FileSystem.getConfigFile('desktop/task_bar.json').subscribe(
      (res: BackendResponse & { data: TaskbarApplication[]; }) => {
        if (res.status === 'error') return this.logger.fatal('Applications', 'Error while getting taskBar Applications', null, res.data);

        this.logger.info('Applications', 'Got TaskBar Applications successfully');

        // Register Start button
        const startApp: TaskbarApplication = {uuid: 'start', pinned: true};
        this.registerTaskBarApplication(startApp);

        // Register every pinned application
        res.data.forEach((application: TaskbarApplication) => this.registerTaskBarApplication(application));
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
    const applicationsToSave: TaskbarApplication[] = this.dataStore.taskBarApplications.filter(obj => obj.pinned === true && obj.uuid !== 'start');

    this.FileSystem.patchConfigFile(applicationsToSave, 'desktop/task_bar.json').subscribe(
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
