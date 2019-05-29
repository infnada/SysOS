import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, SystemJsNgModuleLoader} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule, MatButtonModule, MatDividerModule, MatCheckboxModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {CookieService} from 'ngx-cookie-service';
import {ToastrModule} from 'ngx-toastr';
import {OrderModule} from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {ResizableModule} from 'angular-resizable-element';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {MonacoEditorModule} from 'ngx-monaco-editor';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {TaskBarComponent} from './components/task-bar/task-bar.component';
import {TaskBarItemsComponent} from './components/task-bar-items/task-bar-items.component';
import {StartMenuComponent} from './components/start-menu/start-menu.component';
import {StartMenuItemsComponent} from './components/start-menu-items/start-menu-items.component';
import {ApplicationComponent} from './components/application/application.component';

import {FileModule} from './shared-modules/file/file.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DesktopComponent,
    TaskBarComponent,
    StartMenuComponent,
    TaskBarItemsComponent,
    StartMenuItemsComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    DragDropModule,
    ToastrModule.forRoot(),
    OrderModule,
    FilterPipeModule,
    ResizableModule,
    NgbModalModule,
    MonacoEditorModule.forRoot(),
    // Shared module import
    FileModule
  ],
  entryComponents: [
  ],
  providers: [
    CookieService,
    SystemJsNgModuleLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
