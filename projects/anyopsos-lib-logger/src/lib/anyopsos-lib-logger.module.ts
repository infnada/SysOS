import {NgModule} from '@angular/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';

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
