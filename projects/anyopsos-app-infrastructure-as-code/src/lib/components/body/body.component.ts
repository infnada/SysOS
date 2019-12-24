import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppInfrastructureAsCodeService} from '../../services/anyopsos-app-infrastructure-as-code.service';
import {IaCProject} from '../../types/Ia-C-Project';

@Component({
  selector: 'saiac-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  projects: IaCProject[];
  activeProject: string;

  constructor(private IaC: AnyOpsOSAppInfrastructureAsCodeService) {
  }

  ngOnInit(): void {

    // Listen for projects changes
    this.IaC.projects
      .pipe(takeUntil(this.destroySubject$)).subscribe((projects: IaCProject[]) => this.projects = projects);

    // Listen for activeProject change
    this.IaC.activeProject
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeProjectUuid: string) => this.activeProject = activeProjectUuid);
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveProject(project: IaCProject): void {
    this.IaC.setActiveProject(project.uuid);
  }

  getActiveProject(): IaCProject {
    return this.IaC.getActiveProject();
  }
}
