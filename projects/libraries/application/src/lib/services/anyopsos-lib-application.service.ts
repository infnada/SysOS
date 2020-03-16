import {Injectable} from '@angular/core';

import {Observable, BehaviorSubject, Subject} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';

import {Application} from '../types/application';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibApplicationService {
  private readonly subjectCloseApplication: Subject<Application> = new Subject();
  private readonly subjectToggleApplication: Subject<string> = new Subject();

  readonly $applications: BehaviorSubject<Application[]>;
  readonly $openedApplications: BehaviorSubject<Application[]>;
  readonly $activeApplication: BehaviorSubject<string>;
  private dataStore: {
    applications: Application[];
    openedApplications: Application[];
    activeApplication: string;
  };
  readonly applications: Observable<Application[]>;
  readonly openedApplications: Observable<Application[]>;
  readonly activeApplication: Observable<string>;

  private currentHoverApplication: string = null;

  constructor(private readonly logger: AnyOpsOSLibLoggerService) {

    this.dataStore = { openedApplications: [],
      applications: [
        { uuid: 'start', ico: 'fab fa-windows', name: 'Start Menu', menu: true }
      ], activeApplication: null };
    this.$applications = new BehaviorSubject(this.dataStore.applications);
    this.$openedApplications = new BehaviorSubject(this.dataStore.openedApplications);
    this.$activeApplication = new BehaviorSubject(this.dataStore.activeApplication);
    this.openedApplications = this.$openedApplications.asObservable();
    this.applications = this.$applications.asObservable();
    this.activeApplication = this.$activeApplication.asObservable();
  }

  /**
   * Main error handler
   */
  errorHandler(e: any): Error {
    if (!e) throw new Error('e_not_found');

    this.logger.error('LibApplication', 'General Error', null, e);
    return new Error(e);
  }

  /**
   * Called by {@link AnyOpsOSLibLoaderService#loadModal}
   */
  patchApplication(applicationUuid: string, param: string, data: any): void {
    const applicationIndex: number = this.dataStore.applications.findIndex((application: Application) => application.uuid === applicationUuid);
    if (applicationIndex === -1) {
      this.logger.error('LibApplication', 'patchModal -> Resource invalid', arguments);
      throw new Error('resource_invalid');
    }

    this.dataStore.applications[applicationIndex][param] = data;
  }

  /**
   * Check if application is opened
   */
  isApplicationInstalled(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.applications.find((app: Application) => app.uuid === applicationUuid) !== undefined;
  }

  /**
   * Check if application is opened
   */
  isApplicationOpened(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.openedApplications.find((app: Application) => app.uuid === applicationUuid) !== undefined;
  }

  /**
   * If and application is not registered it will not be accessible from Desktop or other applications
   */
  registerApplication(application: Application): void {
    if (!application) throw new Error('application_not_found');

    this.logger.debug('LibApplication', 'New application registration', arguments);

    this.dataStore.applications.push(application);

    // broadcast data to subscribers
    this.$applications.next(Object.assign({}, this.dataStore).applications);
  }

  /**
   * Return all application info
   */
  getApplicationByUuid(applicationUuid: string): Application {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.applications.find(obj => obj.uuid === applicationUuid);
  }

  /**
   * Closes an application
   */
  closeApplication(applicationUuid: string): void {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    this.logger.debug('LibApplication', 'Closing application', arguments);

    // Delete application object
    this.dataStore.openedApplications = this.dataStore.openedApplications.filter(el => el.uuid !== applicationUuid);

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);
  }

  /**
   * Opens a new application
   */
  openApplication(applicationUuid: string, initData?: any): void {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    this.logger.debug('LibApplication', 'Opening application', arguments);

    // If app is not an object get all application data
    const app = this.getApplicationByUuid(applicationUuid);
    app.initData = initData;

    // Check if application is already opened
    if (this.isApplicationOpened(app.uuid)) return;

    // Create a new instance of the application
    this.dataStore.openedApplications.push(app);

    // broadcast data to subscribers
    this.$openedApplications.next(Object.assign({}, this.dataStore).openedApplications);

    // Emitting to application directives (minimize or maximize)
    // setTimeout is needed to make sure application is initialized and subscribed to toggle event
    setTimeout(() => this.sendToggleApplication(app.uuid), 0);
  }

  /**
   * Check if application is active (not in background) on Desktop
   */
  isActiveApplication(applicationUuid: string): boolean {
    if (typeof applicationUuid !== 'string' && applicationUuid !== null) throw new Error('id_not_found');

    return this.dataStore.activeApplication === applicationUuid;
  }

  /**
   * Set the current application where the mouse is in
   */
  setCurrentHoverApplication(applicationUuid: string): void {
    this.currentHoverApplication = applicationUuid;
  }

  /**
   * Puts an application active or at background
   */
  toggleApplication(applicationUuid: string): void {
    if (typeof applicationUuid !== 'string' && applicationUuid !== null) throw new Error('error_id');

    if (applicationUuid === null) {
      this.dataStore.activeApplication = null;
    } else if (this.isActiveApplication(applicationUuid)) {
      this.dataStore.activeApplication = null;
    } else {
      this.dataStore.activeApplication = applicationUuid;
    }

    // broadcast data to subscribers
    this.$activeApplication.next(Object.assign({}, this.dataStore).activeApplication);
  }

  /**
   * Observers
   */
  sendCloseApplication(application: Application): void {
    this.subjectCloseApplication.next(application);
  }

  getObserverCloseApplication(): Observable<Application> {
    return this.subjectCloseApplication.asObservable();
  }

  sendToggleApplication(applicationUuid: string): void {
    this.subjectToggleApplication.next(applicationUuid);
  }

  getObserverToggleApplication(): Observable<string> {
    return this.subjectToggleApplication.asObservable();
  }
}
