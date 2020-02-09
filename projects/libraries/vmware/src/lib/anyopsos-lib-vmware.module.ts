import {NgModule} from '@angular/core';

import {MainService} from '@anyopsos/frontend/app/services/main.service';

import {AnyOpsOSLibVmwareConnectionsStateService} from './services/anyopsos-lib-vmware-connections-state.service';
import {AnyOpsOSLibVmwareFileSystemHandlersService} from './services/anyopsos-lib-vmware-file-system-handlers.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AnyOpsOSLibVmwareModule {

  constructor(private readonly MainService: MainService,
              private readonly LibVmwareConnectionsState: AnyOpsOSLibVmwareConnectionsStateService,
              private readonly LibVmwareFileSystemHandlers: AnyOpsOSLibVmwareFileSystemHandlersService) {

    // Initialize connections when user is loggedIn
    this.MainService.currentBootstrapState.subscribe((data: { appBootstrapped: boolean; }) => {
      if (data.appBootstrapped === true && !this.LibVmwareConnectionsState.getConnectionsInitialized()) {

        // Get Vmware connections
        this.LibVmwareConnectionsState.initConnections();

        // This allows to manage file and folders
        this.LibVmwareFileSystemHandlers.registerFileSystemUiHandlers();
      }
    });

  }
}
