import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';

import {BodyComponent} from './body/body.component';
import {MenuComponent} from './menu/menu.component';
import {ShapesService} from './services/shapes.service';

@NgModule({
  declarations: [BodyComponent, MenuComponent],
  imports: [
    CommonModule
  ],
  exports: []
})
export class AnyOpsOSAppDrawerModule {

  constructor(private Applications: AnyOpsOSLibApplicationService,
              private Shapes: ShapesService) {

    Applications.registerApplication({
      id: 'drawer',
      ico: 'fas fa-paint-brush',
      name: 'Drawer',
      menu: true,
      style: {width: '1800px', height: '750px', top: '5%', left: '5%'}
    });

    this.Shapes.registerShapes();
  }
}
