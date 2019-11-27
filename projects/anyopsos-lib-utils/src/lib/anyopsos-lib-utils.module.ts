import {NgModule} from '@angular/core';

import {NgNoCheck} from './directives/no-check.directive';
import {TextInputComponent} from './components/text-input/text-input.component';
import {MonacoEditorModule} from "ngx-monaco-editor";
import {FormsModule} from "@angular/forms";

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
