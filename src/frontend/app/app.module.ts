// App starts
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';
import {COMPILER_OPTIONS, CompilerFactory, Compiler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {CookieService} from 'ngx-cookie-service';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {MonacoEditorModule} from 'ngx-monaco-editor'; // this is an application required module...

// Internal libraries
import {AnyOpsOSLibFileModule} from '@anyopsos/lib-file';
import {AnyOpsOSLibFolderModule} from '@anyopsos/lib-folder';
import {AnyOpsOSLibApplicationModule} from '@anyopsos/lib-application';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';
import {AnyOpsOSLibSelectableService} from '@anyopsos/lib-selectable';
import {AnyOpsOSLibServiceInjectorModule} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibLoggerModule} from '@anyopsos/lib-logger';
import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

// App Components
import {BootstrapComponent} from './components/bootstrap/bootstrap.component';
import {AppComponent} from './components/app.component';
import {LoginComponent} from './components/login/login.component';
import {StartMenuComponent} from './components/start-menu/start-menu.component';
import {StartMenuItemsComponent} from './components/start-menu-items/start-menu-items.component';
import {TaskBarComponent} from './components/task-bar/task-bar.component';
import {TaskBarItemsComponent} from './components/task-bar-items/task-bar-items.component';
import {DesktopComponent} from './components/desktop/desktop.component';

import {CapsLockDirective} from './directives/caps-lock.directive';

import {HttpErrorInterceptor} from './interceptors/http-error-interceptor';

import {SystemJsLoaderService} from "./services/system-js-loader.service";

const config: SocketIoConfig = {
  url: window.location.host,
  options: {
    autoConnect: false,
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

    AnyOpsOSLibApplicationModule,
    AnyOpsOSLibFileModule,
    AnyOpsOSLibFolderModule,
    AnyOpsOSLibServiceInjectorModule,
    AnyOpsOSLibLoggerModule,
    AnyOpsOSLibAngularMaterialModule,
    AnyOpsOSLibPipesModule,

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    CookieService,
    AnyOpsOSLibSelectableService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Initialize libraries with SystemJs
  constructor(private readonly SystemJsLoaderService: SystemJsLoaderService) {

  }

}
