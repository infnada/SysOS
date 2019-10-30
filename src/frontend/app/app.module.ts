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

import * as SysOSLibAngularMaterial from '@sysos/lib-angular-material';
import * as SysOSLibApplications from '@sysos/lib-application';
import * as SysOSLibFolder from '@sysos/lib-folder';
import * as SysOSLibFile from '@sysos/lib-file';
import * as SysOSLibFileSystem from '@sysos/lib-file-system';
import * as SysOSLibFileSystemUi from '@sysos/lib-file-system-ui';
import * as SysOSLibLogger from '@sysos/lib-logger';
import * as SysOSLibModal from '@sysos/lib-modal';
import * as SysOSLibNetApp from '@sysos/lib-netapp';
import * as SysosLibSanitize from '@sysos/lib-sanitize';
import * as SysOSLibScrollSpy from '@sysos/lib-scroll-spy';
import * as SysOSLibSelectable from '@sysos/lib-selectable';
import * as SysOSLibServiceInjector from '@sysos/lib-service-injector';
import * as SysOSLibTypes from '@sysos/lib-types';
import * as SysOSLibUser from '@sysos/lib-user';
import * as SysOSLibUtils from '@sysos/lib-utils';
import * as SysOSLibVMWare from '@sysos/lib-vmware';

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
SystemJS.set('@sysos/lib-angular-material', SystemJS.newModule(SysOSLibAngularMaterial));
SystemJS.set('@sysos/lib-application', SystemJS.newModule(SysOSLibApplications));
SystemJS.set('@sysos/lib-folder', SystemJS.newModule(SysOSLibFolder));
SystemJS.set('@sysos/lib-file', SystemJS.newModule(SysOSLibFile));
SystemJS.set('@sysos/lib-file-system', SystemJS.newModule(SysOSLibFileSystem));
SystemJS.set('@sysos/lib-file-system-ui', SystemJS.newModule(SysOSLibFileSystemUi));
SystemJS.set('@sysos/lib-logger', SystemJS.newModule(SysOSLibLogger));
SystemJS.set('@sysos/lib-modal', SystemJS.newModule(SysOSLibModal));
SystemJS.set('@sysos/lib-netapp', SystemJS.newModule(SysOSLibNetApp));
SystemJS.set('@sysos/lib-sanitize', SystemJS.newModule(SysosLibSanitize));
SystemJS.set('@sysos/lib-scroll-spy', SystemJS.newModule(SysOSLibScrollSpy));
SystemJS.set('@sysos/lib-selectable', SystemJS.newModule(SysOSLibSelectable));
SystemJS.set('@sysos/lib-service-injector', SystemJS.newModule(SysOSLibServiceInjector));
SystemJS.set('@sysos/lib-types', SystemJS.newModule(SysOSLibTypes));
SystemJS.set('@sysos/lib-user', SystemJS.newModule(SysOSLibUser));
SystemJS.set('@sysos/lib-utils', SystemJS.newModule(SysOSLibUtils));
SystemJS.set('@sysos/lib-vmware', SystemJS.newModule(SysOSLibVMWare));

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

import {SysosLibFileModule} from '@sysos/lib-file';
import {SysosLibFolderModule} from '@sysos/lib-folder';
import {SysosLibApplicationModule} from '@sysos/lib-application';
import {SysosLibSelectableService} from '@sysos/lib-selectable';
import {SysosLibServiceInjectorModule} from '@sysos/lib-service-injector';
import {SysosLibLoggerModule} from '@sysos/lib-logger';
import {SysosLibAngularMaterialModule} from '@sysos/lib-angular-material';

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

    SysosLibApplicationModule,
    SysosLibFileModule,
    SysosLibFolderModule,
    SysosLibServiceInjectorModule,
    SysosLibLoggerModule,
    SysosLibAngularMaterialModule,

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
    SysosLibSelectableService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
