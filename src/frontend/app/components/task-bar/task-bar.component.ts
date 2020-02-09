import {Component, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {CdkDragDrop, moveItemInArray} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibDesktopTaskBarService, TaskbarApplication} from '@anyopsos/lib-desktop-task-bar';

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss']
})
export class TaskBarComponent implements OnInit, OnDestroy {
  private readonly destroySubject$: Subject<void> = new Subject();

  taskBarApplications: TaskbarApplication[];
  clock: string = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});

  constructor(private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibDesktopTaskBar: AnyOpsOSLibDesktopTaskBarService) {
  }

  ngOnInit(): void {
    this.LibDesktopTaskBar.taskBarApplications.pipe(takeUntil(this.destroySubject$)).subscribe((applications: TaskbarApplication[]) => this.taskBarApplications = applications);

    setInterval(() => {
      this.clock = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.taskBarApplications, event.previousIndex, event.currentIndex);
    this.LibDesktopTaskBar.saveTaskBarApplicationsOrder();
  }

  minimizeToDesktop(): void {
    this.LibApplication.sendToggleApplication(null);
  }

}
