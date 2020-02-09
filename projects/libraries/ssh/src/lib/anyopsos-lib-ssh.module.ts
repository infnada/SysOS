import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibSshConnectionsStateService} from './services/anyopsos-lib-ssh-connections-state.service';
import {AnyOpsOSLibSshFileSystemHandlersService} from './services/anyopsos-lib-ssh-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibSshModule {

  constructor(private readonly MainService: MainService,
              private readonly LibSshConnectionsState: AnyOpsOSLibSshConnectionsStateService,
              private readonly LibSshFileSystemHandlers: AnyOpsOSLibSshFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibSshConnectionsState.getConnectionsInitialized()) {

        // Get SSH & SFTP connections
        this.LibSshConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibSshFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }

}
