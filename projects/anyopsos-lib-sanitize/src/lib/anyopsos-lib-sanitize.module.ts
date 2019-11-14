import {NgModule} from '@angular/core';
import {SanitizeHtmlPipe} from './html/sanitize-html.pipe';
import {SanitizeUrlPipe} from './url/sanitize-url.pipe';
import {SanitizeStylePipe} from './style/sanitize-style.pipe';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    SanitizeUrlPipe,
    SanitizeStylePipe
  ],
  imports: [],
  exports: [
    SanitizeHtmlPipe,
    SanitizeUrlPipe,
    SanitizeStylePipe
  ]
})
export class AnyOpsOSLibSanitizeModule {
}
