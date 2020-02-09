import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNetappConnectionsStateService} from './services/anyopsos-lib-netapp-connections-state.service';
import {AnyOpsOSLibNetappFileSystemHandlersService} from './services/anyopsos-lib-netapp-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNetappModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNetappConnectionsState: AnyOpsOSLibNetappConnectionsStateService,
              private readonly LibNetappFileSystemHandlers: AnyOpsOSLibNetappFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNetappConnectionsState.getConnectionsInitialized()) {

        // Get Netapp connections
        this.LibNetappConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNetappFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
