import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MonacoEditorModule} from 'ngx-monaco-editor';

import {NgNoCheck} from './directives/no-check.directive';
import {TextInputComponent} from './components/text-input/text-input.component';

@NgModule({
  declarations: [
    NgNoCheck,
    TextInputComponent
  ],
  imports: [
    MonacoEditorModule,
    FormsModule
  ],
  exports: [
    NgNoCheck,
    TextInputComponent
  ]
})
export class AnyOpsOSLibUtilsModule {
}
