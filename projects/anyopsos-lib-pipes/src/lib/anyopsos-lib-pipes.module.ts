import {NgModule} from '@angular/core';

import {OrderModule} from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';

import {SanitizeHtmlPipe} from './sanitize/html/sanitize-html.pipe';
import {SanitizeUrlPipe} from './sanitize/url/sanitize-url.pipe';
import {SanitizeStylePipe} from './sanitize/style/sanitize-style.pipe';

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
    SanitizeStylePipe,
    OrderModule,
    FilterPipeModule
  ]
})
export class AnyOpsOSLibPipesModule {
}
