import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibNodeVmwareConnectionsStateService} from './services/anyopsos-lib-node-vmware-connections-state.service';
import {AnyOpsOSLibNodeVmwareFileSystemHandlersService} from './services/anyopsos-lib-node-vmware-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibNodeVmwareModule {

  constructor(private readonly MainService: MainService,
              private readonly LibNodeVmwareConnectionsState: AnyOpsOSLibNodeVmwareConnectionsStateService,
              private readonly LibNodeVmwareFileSystemHandlers: AnyOpsOSLibNodeVmwareFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibNodeVmwareConnectionsState.getConnectionsInitialized()) {

        // Get Vmware connections
        this.LibNodeVmwareConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibNodeVmwareFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
