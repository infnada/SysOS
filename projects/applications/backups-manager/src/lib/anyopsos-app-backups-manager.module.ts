import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {AnyOpsOSAppBackupsManagerService} from './services/anyopsos-app-backups-manager.service';
import {ActionsComponent} from './actions/actions.component';
import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [
    ActionsComponent,
    BodyComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class AnyOpsOSAppBackupsManagerModule {
  constructor(private Applications: AnyOpsOSLibApplicationService,
              private BackupsManager: AnyOpsOSAppBackupsManagerService) {

    Applications.registerApplication({
      uuid: 'backups-manager',
      ico: 'fas fa-hdd',
      name: 'Backups Manager',
      menu: true,
      actions: true,
      style: {width: '1070px', height: '700px', top: '5%', left: '20%'}
    });


    this.BackupsManager.initBackups();
    this.BackupsManager.initRestores();
  }
}
