import {NgModule} from '@angular/core';
import {SanitizeHtmlPipe} from './html/sanitize-html.pipe';
import {SanitizeUrlPipe} from './url/sanitize-url.pipe';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    SanitizeUrlPipe
  ],
  imports: [],
  exports: [
    SanitizeHtmlPipe,
    SanitizeUrlPipe
  ]
})
export class SysosLibSanitizeModule {
}
