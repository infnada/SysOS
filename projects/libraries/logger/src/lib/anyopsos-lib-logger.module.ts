import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

@NgModule({
  declarations: [],
  imports: [
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG}),
    HttpClientModule
  ],
  exports: []
})
export class AnyOpsOSLibLoggerModule {
}
