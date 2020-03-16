import {Component, Input, OnInit, Output} from '@angular/core';

import {MatDialog, MatDialogConfig, MatDialogRef} from '@anyopsos/lib-angular-material';

import {AnyOpsOSModalKubernetesLogsComponent} from '../anyopsos-modal-kubernetes-logs.component';

/**
 * This file is called by @anyopsos/lib-modal and is used to open a Modal.
 * You should NOT edit any of this content.
 */
@Component({
  template: ''
})
export class EntryComponent implements OnInit {
  @Input() private readonly dialogConfig: MatDialogConfig;
  @Output() private dialogRef: MatDialogRef<any>;

  constructor(private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialogRef = this.dialog.open(AnyOpsOSModalKubernetesLogsComponent, this.dialogConfig);
  }
}
