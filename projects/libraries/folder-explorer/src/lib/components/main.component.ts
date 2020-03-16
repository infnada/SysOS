import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Application} from '@anyopsos/lib-application';
import {Connection} from '@anyopsos/backend-core/app/types/connection';

import {AnyOpsOSLibFolderExplorerService} from '../services/anyopsos-lib-folder-explorer.service';

@Component({
  selector: 'alfolder-explorer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [AnyOpsOSLibFolderExplorerService]
})
export class FolderExplorerMainComponent implements OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;
  @Input() readonly connection: Connection = null;

  constructor(public readonly FolderExplorer: AnyOpsOSLibFolderExplorerService) {
  }

  ngOnInit(): void {

    // Set bodyContainerRef, this is used by Modals
    this.FolderExplorer.setBodyContainerRef(this.bodyContainer);
  }
}
