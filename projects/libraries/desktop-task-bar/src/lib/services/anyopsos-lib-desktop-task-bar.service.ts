import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibFileSystemService} from '@anyopsos/lib-file-system';
import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {TaskbarApplication} from '../types/taskbar-application';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibDesktopTaskBarService {
  readonly $taskBarApplications: BehaviorSubject<TaskbarApplication[]>;
  private dataStore: {
    taskBarApplications: TaskbarApplication[];
  };
  readonly taskBarApplications: Observable<TaskbarApplication[]>;

  private openedApplications: Application[] = [];

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibFileSystem: AnyOpsOSLibFileSystemService,
              private readonly LibApplication: AnyOpsOSLibApplicationService) {

    this.dataStore = { taskBarApplications: [] };
    this.$taskBarApplications = new BehaviorSubject(this.dataStore.taskBarApplications);
    this.taskBarApplications = this.$taskBarApplications.asObservable();

    this.LibApplication.openedApplications.subscribe((openedApplications: Application[]) => this.onOpenedApplicationsChange(openedApplications));
  }

  private onOpenedApplicationsChange(openedApplications: Application[]) {
    const opened: Application[] = openedApplications.filter((application: Application) => !this.openedApplications.includes(application));
    const closed: Application[] = this.openedApplications.filter((application: Application) => !openedApplications.includes(application));

    this.openedApplications = JSON.parse(JSON.stringify(openedApplications));

    // Remove from Desktop Task Bar (application closed)
    closed.forEach((application: Application) => {
      this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter((el: TaskbarApplication) => el.pinned === true || el.uuid !== application.uuid);
    });

    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);

    // Application not in pinned list. Show it on Desktop Task Bar (application opened)
    opened.forEach((application: Application) => {
      if (!this.isApplicationInTaskBar(application.uuid)) {
        this.registerTaskBarApplication({uuid: application.uuid, pinned: false});
      }
    });
  }

  /**
   * Check if application is in Desktop Task Bar
   */
  private isApplicationInTaskBar(applicationUuid: string): boolean {
    return this.dataStore.taskBarApplications.find((app: TaskbarApplication) => app.uuid === applicationUuid) !== undefined;
  }

  /**
   * Get application index in Desktop Task Bar
   */
  private getApplicationIndexInTaskBar(applicationUuid: string): number {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    return this.dataStore.taskBarApplications.findIndex((app: TaskbarApplication) => app.uuid === applicationUuid);
  }

  /**
   * Set an application to be shown in Desktop Task Bar
   */
  registerTaskBarApplication(data: TaskbarApplication, save?: boolean): void {
    if (!data) throw new Error('id_not_found');

    this.logger.trace('LibDesktopTaskBar', 'Registering application in TaskBar', arguments);

    // Applications already in Task Bar
    if (this.isApplicationInTaskBar(data.uuid)) {

      // Delete if unpin application and is not opened
      if (data.pinned === false && !this.LibApplication.isApplicationOpened(data.uuid)) {
        this.dataStore.taskBarApplications = this.dataStore.taskBarApplications.filter((app: TaskbarApplication) => app.uuid !== data.uuid);
      } else {

        // Pin or unpin opened application application
        const applicationIndex = this.getApplicationIndexInTaskBar(data.uuid);
        this.dataStore.taskBarApplications[applicationIndex].pinned = data.pinned;
      }

    } else {

      this.logger.trace('LibDesktopTaskBar', 'Register application in TaskBar', arguments);
      this.dataStore.taskBarApplications.push(data);
    }

    // broadcast data to subscribers
    this.$taskBarApplications.next(Object.assign({}, this.dataStore).taskBarApplications);

    // Save new config to file
    if (save === true) this.saveTaskBarApplicationsOrder();
  }

  /**
   * Check if application is pinned in Task Bar
   */
  isApplicationPinned(applicationUuid: string): boolean {
    if (!applicationUuid) throw new Error('applicationUuid_not_found');

    const application = this.dataStore.taskBarApplications.find(obj => obj.uuid === applicationUuid);

    if (application) return application.pinned;
    return false;
  }

  /**
   * Returns all pinned applications
   */
  getTaskBarApplications(): void {
    this.LibFileSystem.getConfigFile('task_bar.json').subscribe(
      (res: BackendResponse & { data: TaskbarApplication[]; }) => {
        if (res.status === 'error') return this.logger.fatal('Applications', 'Error while getting taskBar Applications', null, res.data);

        this.logger.info('LibDesktopTaskBar', 'Got TaskBar Applications successfully');

        // Register Start button
        const startApp: TaskbarApplication = {uuid: 'start', pinned: true};
        this.registerTaskBarApplication(startApp);

        // Register every pinned application
        res.data.forEach((application: TaskbarApplication) => {

          // Make sure Application is loaded
          if (this.LibApplication.getApplicationByUuid(application.uuid)) this.registerTaskBarApplication(application);
        });
      },
      error => {
        this.logger.error('LibDesktopTaskBar', 'Error while getting TaskBar applications', null, error);
      });
  }

  /**
   * Function called after Sort taskbar applications
   */
  saveTaskBarApplicationsOrder(): void {
    const applicationsToSave: TaskbarApplication[] = this.dataStore.taskBarApplications.filter(obj => obj.pinned === true && obj.uuid !== 'start');

    this.LibFileSystem.patchConfigFile(applicationsToSave, 'task_bar.json').subscribe(
      () => {
        this.logger.debug('LibDesktopTaskBar', 'TaskBar applications saved');
      },
      error => {
        this.logger.error('LibDesktopTaskBar', 'Error while saving TaskBar applications', null, error);
      });
  }
}
