import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {BodyComponent} from './anyopsos-app-wmks.component';

@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [BodyComponent]
})
export class AnyOpsOSAppWmksModule {
  constructor(private Applications: AnyOpsOSLibApplicationService) {
    Applications.registerApplication({
      id: 'wmks',
      ico: 'fas fa-tv',
      name: 'VM Remote Console',
      menu: true,
      style: {width: '90%', height: '90%', top: '2%', left: '5%'}
    });
  }
}
