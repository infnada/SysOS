import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MonacoEditorModule} from 'ngx-monaco-editor';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {NgNoCheck} from './directives/no-check.directive';
import {TextInputComponent} from './components/text-input/text-input.component';
import {NoticeBoxComponent} from './components/notice-box/notice-box.component';
import {RelatimeTimePipe} from './pipes/relatime-time.pipe';

@NgModule({
  declarations: [
    NgNoCheck,
    TextInputComponent,
    NoticeBoxComponent,
    RelatimeTimePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    NgNoCheck,
    TextInputComponent,
    NoticeBoxComponent,
    RelatimeTimePipe
  ]
})
export class AnyOpsOSLibUtilsModule {
}
