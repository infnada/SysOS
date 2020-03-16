import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@anyopsos/lib-angular-material';
import {BodyComponent, ModalData} from '@anyopsos/lib-modal';

@Component({
  selector: 'ammonitor-xss-anyopsos-modal-monitor-xss',
  templateUrl: './anyopsos-modal-monitor-xss.component.html',
  styleUrls: ['./anyopsos-modal-monitor-xss.component.scss']
})
export class AnyOpsOSModalMonitorXssComponent implements OnInit {
  @ViewChild('modalBody', {static: true}) modalBody: BodyComponent;

  serverUrl: string;

  constructor(public readonly dialogRef: MatDialogRef<AnyOpsOSModalMonitorXssComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: ModalData) {

    this.serverUrl = data.serverUrl;
  }

  ngOnInit(): void {

    // Do not delete this
    this.modalBody.dialogRef = this.dialogRef;
    this.modalBody.title = this.data.title ?? 'XSS Protection';
    this.modalBody.type = this.data.type;
  }

}
