import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.DEBUG})
  ],
  exports: []
})
export class AnyOpsOSLibLoggerModule {
}
