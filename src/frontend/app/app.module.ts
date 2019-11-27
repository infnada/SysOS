// Prepare output for SystemJS
declare const SystemJS: any;

import * as angularCore from '@angular/core';
import * as angularPb from '@angular/platform-browser';
import * as angularForms from '@angular/forms';
import * as angularCommon from '@angular/common';
import * as angularCommonHttp from '@angular/common/http';
import * as angularMaterial from '@angular/material';
import * as cdkTree from '@angular/cdk/tree';
import * as cdkDragDrop from '@angular/cdk/drag-drop';
import * as ngBootstrap from '@ng-bootstrap/ng-bootstrap';
import * as rxjs from 'rxjs';
import * as rxjsOperators from 'rxjs/operators';
import * as ngxToastr from 'ngx-toastr';
import * as ngxFilterPipe from 'ngx-filter-pipe';
import * as ngxOrderPipe from 'ngx-order-pipe';
import * as ngxSocketIo from 'ngx-socket-io';
import * as NgxSocketIoService from 'ngx-socket-io/src/socket-io.service';
import * as angularFile from 'angular-file';
import * as uuid from 'uuid';
import * as jsYaml from 'js-yaml';

import * as AnyOpsOSLibAngularMaterial from '@anyopsos/lib-angular-material';
import * as AnyOpsOSLibApplications from '@anyopsos/lib-application';
import * as AnyOpsOSLibFolder from '@anyopsos/lib-folder';
import * as AnyOpsOSLibFile from '@anyopsos/lib-file';
import * as AnyOpsOSLibFileSystem from '@anyopsos/lib-file-system';
import * as AnyOpsOSLibFileSystemUi from '@anyopsos/lib-file-system-ui';
import * as AnyOpsOSLibKubernetes from '@anyopsos/lib-kubernetes';
import * as AnyOpsOSLibLogger from '@anyopsos/lib-logger';
import * as AnyOpsOSLibModal from '@anyopsos/lib-modal';
import * as AnyOpsOSLibNetApp from '@anyopsos/lib-netapp';
import * as AnyOpsOSLibSanitize from '@anyopsos/lib-sanitize';
import * as AnyOpsOSLibScrollSpy from '@anyopsos/lib-scroll-spy';
import * as AnyOpsOSLibSelectable from '@anyopsos/lib-selectable';
import * as AnyOpsOSLibServiceInjector from '@anyopsos/lib-service-injector';
import * as AnyOpsOSLibTypes from '@anyopsos/lib-types';
import * as AnyOpsOSLibUser from '@anyopsos/lib-user';
import * as AnyOpsOSLibUtils from '@anyopsos/lib-utils';
import * as AnyOpsOSLibVMWare from '@anyopsos/lib-vmware';

import * as NgxMonacoEditor from 'ngx-monaco-editor';

SystemJS.set('@angular/core', SystemJS.newModule(angularCore));
SystemJS.set('@angular/forms', SystemJS.newModule(angularForms));
SystemJS.set('@angular/platform-browser', SystemJS.newModule(angularPb));
SystemJS.set('@angular/common', SystemJS.newModule(angularCommon));
SystemJS.set('@angular/common/http', SystemJS.newModule(angularCommonHttp));
SystemJS.set('@angular/material', SystemJS.newModule(angularMaterial));
SystemJS.set('@angular/cdk/tree', SystemJS.newModule(cdkTree));
SystemJS.set('@angular/cdk/drag-drop', SystemJS.newModule(cdkDragDrop));
SystemJS.set('@ng-bootstrap/ng-bootstrap', SystemJS.newModule(ngBootstrap));
SystemJS.set('rxjs', SystemJS.newModule(rxjs));
SystemJS.set('rxjs/operators', SystemJS.newModule(rxjsOperators));
SystemJS.set('ngx-toastr', SystemJS.newModule(ngxToastr));
SystemJS.set('ngx-filter-pipe', SystemJS.newModule(ngxFilterPipe));
SystemJS.set('ngx-order-pipe', SystemJS.newModule(ngxOrderPipe));
SystemJS.set('ngx-socket-io', SystemJS.newModule(ngxSocketIo));
SystemJS.set('ngx-socket-io/src/socket-io.service', SystemJS.newModule(NgxSocketIoService));
SystemJS.set('angular-file', SystemJS.newModule(angularFile));
SystemJS.set('uuid', SystemJS.newModule(uuid));
SystemJS.set('js-yaml', SystemJS.newModule(jsYaml));

SystemJS.set('@anyopsos/lib-angular-material', SystemJS.newModule(AnyOpsOSLibAngularMaterial));
SystemJS.set('@anyopsos/lib-application', SystemJS.newModule(AnyOpsOSLibApplications));
SystemJS.set('@anyopsos/lib-folder', SystemJS.newModule(AnyOpsOSLibFolder));
SystemJS.set('@anyopsos/lib-file', SystemJS.newModule(AnyOpsOSLibFile));
SystemJS.set('@anyopsos/lib-file-system', SystemJS.newModule(AnyOpsOSLibFileSystem));
SystemJS.set('@anyopsos/lib-file-system-ui', SystemJS.newModule(AnyOpsOSLibFileSystemUi));
SystemJS.set('@anyopsos/lib-kubernetes', SystemJS.newModule(AnyOpsOSLibKubernetes));
SystemJS.set('@anyopsos/lib-logger', SystemJS.newModule(AnyOpsOSLibLogger));
SystemJS.set('@anyopsos/lib-modal', SystemJS.newModule(AnyOpsOSLibModal));
SystemJS.set('@anyopsos/lib-netapp', SystemJS.newModule(AnyOpsOSLibNetApp));
SystemJS.set('@anyopsos/lib-sanitize', SystemJS.newModule(AnyOpsOSLibSanitize));
SystemJS.set('@anyopsos/lib-scroll-spy', SystemJS.newModule(AnyOpsOSLibScrollSpy));
SystemJS.set('@anyopsos/lib-selectable', SystemJS.newModule(AnyOpsOSLibSelectable));
SystemJS.set('@anyopsos/lib-service-injector', SystemJS.newModule(AnyOpsOSLibServiceInjector));
SystemJS.set('@anyopsos/lib-types', SystemJS.newModule(AnyOpsOSLibTypes));
SystemJS.set('@anyopsos/lib-user', SystemJS.newModule(AnyOpsOSLibUser));
SystemJS.set('@anyopsos/lib-utils', SystemJS.newModule(AnyOpsOSLibUtils));
SystemJS.set('@anyopsos/lib-vmware', SystemJS.newModule(AnyOpsOSLibVMWare));

SystemJS.set('ngx-monaco-editor', SystemJS.newModule(NgxMonacoEditor));

import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {COMPILER_OPTIONS, CompilerFactory, Compiler, NgModule} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {CookieService} from 'ngx-cookie-service';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {OrderModule} from 'ngx-order-pipe';
import {MonacoEditorModule} from 'ngx-monaco-editor'; // this is an application required module...

import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';
import {AnyOpsOSLibApplicationModule} from '@anyopsos/lib-application';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibServiceInjectorModule} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibLoggerModule} from '@anyopsos/lib-logger';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {StartMenuComponent} from './start-menu/start-menu.component';
import {StartMenuItemsComponent} from './start-menu-items/start-menu-items.component';
import {TaskBarComponent} from './task-bar/task-bar.component';
import {TaskBarItemsComponent} from './task-bar-items/task-bar-items.component';
import {DesktopComponent} from './desktop/desktop.component';

import {CapsLockDirective} from './directives/caps-lock.directive';

import {BootstrapComponent} from './bootstrap/bootstrap.component';

const config: SocketIoConfig = {
  url: window.location.host,
  options: {
    autoConnect : false,
    transports: ['websocket'],
    forceNew: true
  }
};

export function createCompiler(fn: CompilerFactory): Compiler {
  return fn.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StartMenuComponent,
    StartMenuItemsComponent,
    TaskBarComponent,
    TaskBarItemsComponent,
    DesktopComponent,
    CapsLockDirective,
    BootstrapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    SocketIoModule.forRoot(config),
    OrderModule,

    AnyOpsOSLibApplicationModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibFolderModule,
    AnyOpsOSLibServiceInjectorModule,
    AnyOpsOSLibLoggerModule,
    AnyOpsOSLibAngularMaterialModule,

    MonacoEditorModule.forRoot()
  ],
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory]
    },
    CookieService,
    AnyOpsOSLibSelectableService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
