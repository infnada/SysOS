import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';

import {ActionsComponent} from './components/actions/actions.component';
import {MenuComponent} from './components/menu/menu.component';
import {StatusComponent} from './components/status/status.component';
import {BodyComponent} from './components/body/body.component';
import {BodyNewProjectComponent} from './components/body/body-new-project/body-new-project.component';
import { ProjectFormComponent } from './components/body/body-new-project/project-form/project-form.component';
import { DynamicCategoriesComponent } from './components/body/body-new-project/project-form/dynamic-categories/dynamic-categories.component';
import { DynamicInventoryComponent } from './components/body/body-new-project/project-form/dynamic-inventory/dynamic-inventory.component';

@NgModule({
  declarations: [
    ActionsComponent,
    MenuComponent,
    StatusComponent,
    BodyComponent,
    BodyNewProjectComponent,
    ProjectFormComponent,
    DynamicCategoriesComponent,
    DynamicInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Shared module import
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibUtilsModule
  ],
  exports: []
})
export class AnyOpsOSAppInfrastructureAsCodeModule {

  constructor(private Applications: AnyOpsOSLibApplicationService) {

    Applications.registerApplication({
      uuid: 'infrastructure-as-code',
      ico: 'fas fa-code',
      name: 'Infrastructure as Code',
      menu: true,
      actions: true,
      status: true,
      style: {width: '1800px', height: '750px', top: '5%', left: '5%'}
    });

  }
}
