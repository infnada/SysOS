import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import {IaCProject} from '../types/Ia-C-Project';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureAsCodeService {
  private $projects: BehaviorSubject<IaCProject[]>;
  private $activeProject: BehaviorSubject<string>;
  private dataStore: {  // This is where we will store our data in memory
    projects: IaCProject[],
    activeProject: string
  };
  projects: Observable<IaCProject[]>;
  activeProject: Observable<string>;

  constructor() {
    this.dataStore = {projects: [], activeProject: null};
    this.$projects = new BehaviorSubject(this.dataStore.projects);
    this.$activeProject = new BehaviorSubject(this.dataStore.activeProject);
    this.projects = this.$projects.asObservable();
    this.activeProject = this.$activeProject.asObservable();
  }

  getActiveProject(): IaCProject {
    if (this.dataStore.activeProject === null) return null;

    return this.dataStore.projects.find(obj => obj.uuid === this.dataStore.activeProject);
  }

  getProjectByUuid(projectUuid: string): IaCProject {
    if (!projectUuid) throw new Error('projectUuid');

    return this.dataStore.projects.find(obj => obj.uuid === projectUuid);
  }

  setActiveProject(projectUuid: string = null): void {
    this.dataStore.activeProject = projectUuid;

    // broadcast data to subscribers
    this.$activeProject.next(Object.assign({}, this.dataStore).activeProject);
  }
}
