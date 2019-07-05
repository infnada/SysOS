import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {SysosAppBackupsManagerService} from './services/sysos-app-backups-manager.service';
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
export class SysosAppBackupsManagerModule {
  constructor(private Applications: SysosLibApplicationService,
              private BackupsManager: SysosAppBackupsManagerService) {

    Applications.registerApplication({
      id: 'backups-manager',
      ico: 'hdd-o',
      name: 'Backups Manager',
      menu: true,
      actions: true,
      style: {width: '1070px', height: '700px', top: '5%', left: '20%'}
    });


    this.BackupsManager.initBackups();
    this.BackupsManager.initRestores();
  }
}
