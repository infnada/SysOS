import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {Application, SysosLibsApplicationService} from '@sysos/libs-application';

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.scss']
})
export class TaskBarComponent implements OnInit {
  taskBarApplications: Application[];
  clock: string = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.taskBarApplications, event.previousIndex, event.currentIndex);
    this.Applications.saveTaskBarApplicationsOrder();
  }

  constructor(private Applications: SysosLibsApplicationService) {
    setInterval(() => {
      this.clock = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    }, 1000);
  }

  ngOnInit() {
    this.Applications.taskBarApplications.subscribe(applications => this.taskBarApplications = applications);
  }

  minimizeToDesktop(): void {
    this.Applications.sendToggleApplication(null);
  }

}
