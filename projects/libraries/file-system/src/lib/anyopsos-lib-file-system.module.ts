import {NgModule} from '@angular/core';

import {AnyOpsOSLibFileSystemFileHandlersService} from './services/anyopsos-lib-file-system-file-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibFileSystemModule {

  // TODO: this causes circular dependency warnings
  constructor(private readonly FileSystemFileHandlers: AnyOpsOSLibFileSystemFileHandlersService) {

    // This allows to manage local file and folders
    this.FileSystemFileHandlers.registerFileSystemUiHandlers();
  }

}
