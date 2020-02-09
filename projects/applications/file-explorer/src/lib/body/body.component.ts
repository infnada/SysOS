import {Component, Input} from '@angular/core';

import {AnyOpsOSLibFileSystemUiService} from '@anyopsos/lib-file-system-ui';
import {Application} from '@anyopsos/lib-application';

@Component({
  selector: 'aafe-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() readonly application: Application;

  constructor(private readonly LibFileSystemUi: AnyOpsOSLibFileSystemUiService) {
  }

  goToPath(path: string): void {
    this.LibFileSystemUi.sendGoToPath({
      application: 'file-explorer#local',
      path
    });
  }

  /**
   * Left sidebar
   */
  toggleList($event): void {
    $event.currentTarget.parentElement.parentElement.classList.toggle('side__list--open');
  }
}
