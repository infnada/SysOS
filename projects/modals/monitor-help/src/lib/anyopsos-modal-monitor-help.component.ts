import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'ammonitor-help-anyopsos-modal-monitor-help',
  templateUrl: './anyopsos-modal-monitor-help.component.html',
  styleUrls: ['./anyopsos-modal-monitor-help.component.scss']
})
export class AnyOpsOSModalMonitorHelpComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalMonitorHelpComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'Dashboard Help';
    this.modalBody.type = this.data.type;
  }

}
