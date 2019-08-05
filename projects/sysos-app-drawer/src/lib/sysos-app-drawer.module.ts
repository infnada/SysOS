import {NgModule} from '@angular/core';

import {SysosLibApplicationService} from '@sysos/lib-application';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
  declarations: [BodyComponent, MenuComponent],
  imports: [],
  exports: []
})
export class SysosAppDrawerModule {
  constructor(private Applications: SysosLibApplicationService) {
    Applications.registerApplication({
      id: 'notepad',
      ico: 'pencil',
      name: 'Notepad',
      menu: true,
      style: {width: '600px', height: '300px', top: '10%', left: '30%'}
    });
  }
}
